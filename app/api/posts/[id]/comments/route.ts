import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Comment } from "@/src/types/comment-type";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    const db = getDb();
    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
    if (!post) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const comments = db
      .prepare("SELECT * FROM comments WHERE postId = ?")
      .all(id) as Comment[];
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
