import executeQuery from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";

// /api/posts
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // page와 limit 값을 가져옵니다.
    const page = searchParams.get("page");
    const limit = searchParams.get("limit") || "10";
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");

    // /api/comments?userId={userId} 유저별 댓글 목록
    if (userId) {
      try {
        const data = await executeQuery(
          "SELECT * FROM comments where userId = ? ORDER by id",
          [userId]
        );

        return NextResponse.json(
          {
            message: "유저 댓글 목록 조회 성공",
            comments: data
          },
          { status: 200 }
        );
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { message: "댓글 목록 조회 실패" },
          { status: 500 }
        );
      }
    }

    // /api/comments?postId={postId} 게시물별 댓글 목록
    if (postId) {
      try {
        const data = await executeQuery(
          "SELECT * FROM comments where postId = ? ORDER by id",
          [postId]
        );

        return NextResponse.json(
          {
            message: "게시물 댓글 목록 조회 성공",
            comments: data
          },
          { status: 200 }
        );
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { message: "댓글 목록 조회 실패" },
          { status: 500 }
        );
      }
    }

    let sql;
    let values: Array<number> = [];
    let offset: number | null = null;
    let hasNextPage: boolean | null = null;

    if (page && limit) {
      // 페이지네이션 계산
      offset = (parseInt(page) - 1) * parseInt(limit);
      sql = "SELECT * FROM comments ORDER by id LIMIT ? OFFSET ?";
      values = [parseInt(limit), offset];
      // hasNextPage 계산
      const totalComments = 500;
      hasNextPage =
        offset !== null && offset + parseInt(limit || "0") < totalComments;
    } else if (!page && limit) {
      // limit만 있을 때 처음부터 limit개만 반환
      sql = "SELECT * FROM comments ORDER by id LIMIT ?";
      values = [parseInt(limit)];
    } else {
      // page, limit 모두 없으면 전체 데이터를 조회
      sql = "SELECT * FROM comments ORDER by id";
    }

    // 데이터베이스 쿼리 실행
    const data = await executeQuery(sql, values);

    // 응답 객체 생성
    const response: {
      message: string;
      comments: Comment[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "댓글 목록 조회 성공",
      comments: data as Comment[]
    };

    // 조건에 따라 page, limit, hasNextPage 추가
    if (page) response.page = parseInt(page);
    if (limit) response.limit = parseInt(limit);
    if (hasNextPage !== null) response.hasNextPage = hasNextPage;

    const res = NextResponse.json(response, { status: 200 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return res;
  } catch (error) {
    console.error(error);
    const res = NextResponse.json(
      { message: "댓글 목록 조회 실패" },
      { status: 500 }
    );
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return res;
  }
}

export async function POST(req: NextRequest) {
  const { content = "" } = await req.json().catch(() => ({}));

  try {
    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = {
      id: 501,
      content,
      createdAt: new Date(),
      userId: 1,
      postId: 1
    };
    return NextResponse.json(
      {
        message: "댓글 생성 성공",
        comment: dummyData
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
