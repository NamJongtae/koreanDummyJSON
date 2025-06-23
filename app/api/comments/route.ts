import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Comment } from "@/src/types/comment-type";

const dbFile = path.resolve(process.cwd(), "src/db/comments.json");
const dbPromise = JSONFilePreset<{ comments: Comment[] }>(dbFile, {
  comments: []
});

export async function GET(req: NextRequest) {
  try {
    const db = await dbPromise;
    const comments: Comment[] = db.data.comments;

    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    let limit = searchParams.get("limit");
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");

    let filtered = comments;

    // userId로 필터
    if (userId) {
      filtered = filtered.filter((c) => c.userId === parseInt(userId, 10));
      return NextResponse.json(
        {
          message: "유저 댓글 목록 조회 성공",
          comments: filtered
        },
        { status: 200 }
      );
    }

    // postId로 필터
    if (postId) {
      filtered = filtered.filter((c) => c.postId === parseInt(postId, 10));
      return NextResponse.json(
        {
          message: "게시물 댓글 목록 조회 성공",
          comments: filtered
        },
        { status: 200 }
      );
    }

    // 페이지네이션
    let offset: number | null = null;
    let hasNextPage: boolean | null = null;

    if (page && !limit) {
      limit = "10";
    }

    let result = filtered;
    if (page && limit) {
      offset = (parseInt(page) - 1) * parseInt(limit);
      result = filtered.slice(offset, offset + parseInt(limit));
      const totalComments = filtered.length;
      hasNextPage =
        offset !== null && offset + parseInt(limit || "0") < totalComments;
    } else if (!page && limit) {
      result = filtered.slice(0, parseInt(limit));
    }

    const response: {
      message: string;
      comments: Comment[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "댓글 목록 조회 성공",
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

  try {
    const db = await dbPromise;
    const comments: Comment[] = db.data.comments;
    const newId =
      comments.length > 0
        ? Math.max(...comments.map((c) => c.id)) + 1
        : 1;
    const newComment: Comment = {
      id: newId,
      content,
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
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
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "댓글 생성 실패" }, { status: 500 });
  }
}
