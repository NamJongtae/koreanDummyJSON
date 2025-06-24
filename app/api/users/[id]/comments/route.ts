import { getDb } from "@/src/db/sqlite";
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

    const db = getDb();
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!user) {
      return NextResponse.json(
        { message: "해당 유저가 존재하지 않습니다." },
        { status: 404 }
      );
    }

    const comments = db
      .prepare(
        "SELECT id as commentId, content, createdAt FROM comments WHERE userId = ?"
      )
      .all(id);

    return NextResponse.json(
      { message: "유저 댓글 목록 조회 성공", comments },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "유저 댓글 목록 조회 실패" },
      { status: 500 }
    );
  }
}
