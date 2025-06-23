import executeQuery from "@/src/db/db";
import { Post } from "@/src/types/post-type";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: Promise<{ id: string }>;
}
export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "id를 입력해주세요." },
        { status: 400 }
      );
    }

    const sql =
      "SELECT users.id, posts.id AS postId, posts.title, posts.content, posts.imgUrl, posts.createdAt FROM users INNER JOIN posts ON users.id = posts.userId where users.id = ?;";
    const posts = (await executeQuery(sql, [id])) as Post[];

    return NextResponse.json(
      { message: "유저 게시물 목록 조회 성공", posts },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "유저 게시물 목록 조회 실패" },
      { status: 500 }
    );
  }
}
