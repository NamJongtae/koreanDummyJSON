import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Review } from "@/src/types/review-type";

const dbFile = path.resolve(process.cwd(), "src/db/reviews.json");
const dbPromise = JSONFilePreset<{ reviews: Review[] }>(dbFile, {
  reviews: []
});

export async function GET(req: NextRequest) {
  try {
    const db = await dbPromise;
    const reviews: Review[] = db.data.reviews;

    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    let limit = searchParams.get("limit");
    const userId = searchParams.get("userId");
    const bookId = searchParams.get("bookId");

    let filtered = reviews;

    // userId로 필터
    if (userId) {
      filtered = filtered.filter((r) => r.userId === parseInt(userId, 10));
      return NextResponse.json(
        {
          message: "리뷰 목록 조회 성공",
          reviews: filtered
        },
        { status: 200 }
      );
    }

    // bookId로 필터
    if (bookId) {
      filtered = filtered.filter((r) => r.bookId === parseInt(bookId, 10));
      return NextResponse.json(
        {
          message: "리뷰 목록 조회 성공",
          reviews: filtered
        },
        { status: 200 }
      );
    }

    // 페이지네이션
    let offset: number | null = null;
    let hasNextPage: boolean | null = null;

    if (page && !limit) {
      limit = "10";
    }

    let result = filtered;
    if (page && limit) {
      offset = (parseInt(page) - 1) * parseInt(limit);
      result = filtered.slice(offset, offset + parseInt(limit));
      const totalReviews = filtered.length;
      hasNextPage =
        offset !== null && offset + parseInt(limit || "0") < totalReviews;
    } else if (!page && limit) {
      result = filtered.slice(0, parseInt(limit));
    }

    const response: {
      message: string;
      reviews: Review[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "리뷰 목록 조회 성공",
      reviews: result
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
      { messages: errors.join(", ") + "을(를) 입력해주세요." },
      { status: 400 }
    );
  }

  try {
    const db = await dbPromise;
    const reviews: Review[] = db.data.reviews;
    const newId =
      reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;
    const newReview: Review = {
      id: newId,
      rating,
      content,
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
      userId: userId,
      bookId: bookId
    };

    return NextResponse.json(
      {
        message: "리뷰 생성 성공",
        review: newReview
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 생성 실패" }, { status: 500 });
  }
}
