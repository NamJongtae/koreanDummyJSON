import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Review } from "@/src/types/review-type";

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
    const book = db.prepare("SELECT * FROM books WHERE id = ?").get(id);
    if (!book) {
      return NextResponse.json(
        { message: "해당 책이 존재하지 않습니다." },
        { status: 404 }
      );
    }

    const reviews = db
      .prepare("SELECT * FROM reviews WHERE bookId = ?")
      .all(id) as Review[];

    return NextResponse.json(
      { message: "책 리뷰 목록 조회 성공", reviews },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "책 리뷰 목록 조회 실패" },
      { status: 500 }
    );
  }
}
