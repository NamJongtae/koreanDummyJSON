import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Review } from "@/src/types/review-type";
import { Book } from "@/src/types/book-type";

const reviewDbFile = path.resolve(process.cwd(), "src/db/reviews.json");
const bookDbFile = path.resolve(process.cwd(), "src/db/books.json");

const reviewDbPromise = JSONFilePreset<{ reviews: Review[] }>(reviewDbFile, {
  reviews: []
});
const bookDbPromise = JSONFilePreset<{ books: Book[] }>(bookDbFile, {
  books: []
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "id를 입력해주세요." },
        { status: 400 }
      );
    }

    const bookDb = await bookDbPromise;

    const book = bookDb.data.books.find((b) => b.id === parseInt(id));
    if (!book) {
      return NextResponse.json(
        { message: "해당 책이 존재하지 않습니다." },
        { status: 404 }
      );
    }

    const reviewDb = await reviewDbPromise;
    const reviews = reviewDb.data.reviews.filter(
      (r) => r.bookId === parseInt(id)
    );

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
