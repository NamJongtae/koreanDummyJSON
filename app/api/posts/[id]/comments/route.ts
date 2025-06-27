import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Comment } from "@/src/types/comment-type";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    const db = await getDb();
    const post = await db.get("SELECT * FROM posts WHERE id = ?", id);
    if (!post) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const comments = (await db.all(
      "SELECT * FROM comments WHERE postId = ?",
      id
    )) as Comment[];
    const mappedComments = comments.map((c) => ({
      postId: c.postId,
      commentId: c.id,
      content: c.content,
      createdAt: c.createdAt
    }));

    return NextResponse.json(
      { message: "게시물 댓글 목록 조회 성공", comments: mappedComments },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "게시물 댓글 목록 조회 실패" },
      { status: 500 }
    );
  }
}
