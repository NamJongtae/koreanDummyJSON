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

    const db = await getDb();
    const book = await db.get("SELECT * FROM books WHERE id = ?", id);
    if (!book) {
      return NextResponse.json(
        { message: "책이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const reviews = (await db.all(
      "SELECT * FROM reviews WHERE bookId = ?",
      id
    )) as Review[];

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
