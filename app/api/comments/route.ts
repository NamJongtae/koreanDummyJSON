import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Comment } from "@/src/types/comment-type";

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    let limit = searchParams.get("limit");
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");

    let query = "SELECT * FROM comments";
    const params: (string | number)[] = [];
    let message = "댓글 목록 조회 성공";

    if (userId) {
      query += " WHERE userId = ?";
      params.push(userId);
      message = "유저 댓글 목록 조회 성공";
    } else if (postId) {
      query += " WHERE postId = ?";
      params.push(postId);
      message = "게시물 댓글 목록 조회 성공";
    }

    const comments = (await db.all(query, ...params)) as Comment[];

    // 페이지네이션
    let offset: number | null = null;
    let hasNextPage: boolean | null = null;

    if (page && !limit) {
      limit = "10";
    }

    let result = comments;
    if (page && limit) {
      offset = (parseInt(page) - 1) * parseInt(limit);
      result = comments.slice(offset, offset + parseInt(limit));
      const totalComments = comments.length;
      hasNextPage =
        offset !== null && offset + parseInt(limit || "0") < totalComments;
    } else if (!page && limit) {
      result = comments.slice(0, parseInt(limit));
    }

    const response: {
      message: string;
      comments: Comment[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message,
      comments: result
    };

    if (page) response.page = parseInt(page);
    if (limit) response.limit = parseInt(limit);
    if (hasNextPage !== null) response.hasNextPage = hasNextPage;

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "댓글 목록 조회 실패" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const {
    content,
    userId = 1,
    postId = 1
  } = await req.json().catch(() => ({}));

  if (!content) {
    return NextResponse.json(
      { message: "content를 입력해주세요." },
      { status: 400 }
    );
  }

  const now = new Date().toISOString().replace("T", " ").slice(0, 19);
  const newComment: Comment = {
    id: 501,
    content,
    createdAt: now,
    userId,
    postId
  };

  return NextResponse.json(
    {
      message: "댓글 생성 성공",
      comment: newComment
    },
    { status: 201 }
  );
}
