import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Review } from "@/src/types/review-type";
import { Database as SqliteDatabase } from "sqlite";

export async function GET(req: NextRequest) {
  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    let limit = searchParams.get("limit");
    const userId = searchParams.get("userId");
    const bookId = searchParams.get("bookId");

    let query = "SELECT * FROM reviews";
    const params: string[] = [];

    if (userId) {
      query += " WHERE userId = ?";
      params.push(userId);
    } else if (bookId) {
      query += " WHERE bookId = ?";
      params.push(bookId);
    }

    const reviews = (await db.all(query, ...params)) as Review[];

    // 페이지네이션
    let pagedReviews = reviews;
    let hasNextPage: boolean | null = null;
    if (page && !limit) limit = "10";
    if (page && limit) {
      const offset = (parseInt(page) - 1) * parseInt(limit);
      pagedReviews = reviews.slice(offset, offset + parseInt(limit));
      hasNextPage = offset + parseInt(limit) < reviews.length;
    } else if (!page && limit) {
      pagedReviews = reviews.slice(0, parseInt(limit));
    }

    const response: {
      message: string;
      reviews: Review[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "리뷰 목록 조회 성공",
      reviews: pagedReviews
    };

    if (page) response.page = parseInt(page);
    if (limit) response.limit = parseInt(limit);
    if (hasNextPage !== null) response.hasNextPage = hasNextPage;

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "리뷰 목록 조회 실패" },
      { status: 500 }
    );
  } finally {
    if (db) await db.close();
  }
}

export async function POST(req: NextRequest) {
  const {
    rating,
    content,
    userId = 1,
    bookId = 1
  } = await req.json().catch(() => ({}));

  const errors: string[] = [];
  if (rating === undefined) errors.push("rating");
  if (!content) errors.push("content");

  if (errors.length > 0) {
    return NextResponse.json(
      { message: errors.join(", ") + "을(를) 입력해주세요." },
      { status: 400 }
    );
  }

  const createdAt = new Date().toISOString().replace("T", " ").slice(0, 19);
  const newReview: Review = {
    id: 501,
    rating,
    content,
    createdAt,
    userId,
    bookId
  };

  return NextResponse.json(
    {
      message: "리뷰 생성 성공",
      review: newReview
    },
    { status: 201 }
  );
}
