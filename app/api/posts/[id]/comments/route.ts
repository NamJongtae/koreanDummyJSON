import executeQuery from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    const sql =
      "SELECT posts.id, comments.id AS commentId, comments.content, comments.createdAt FROM posts INNER JOIN comments ON posts.id = comments.postId where posts.id = ?;";
    const comments = (await executeQuery(sql, [id])) as Comment[];

    return NextResponse.json(
      { message: "게시물 댓글 목록 조회 성공", comments },
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
