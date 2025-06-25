import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    const db = getDb();
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!user) {
      return NextResponse.json(
        { message: "유저가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }
    const posts = db
      .prepare(
        "SELECT id as postId, title, content, imgUrl, createdAt FROM posts WHERE userId = ?"
      )
      .all(id);

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
