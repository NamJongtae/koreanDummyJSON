import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Review } from "@/src/types/review-type";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    const db = getDb();
    const review = db.prepare("SELECT * FROM reviews WHERE id = ?").get(id) as
      | Review
      | undefined;

    if (!review) {
      return NextResponse.json(
        { message: "리뷰가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "리뷰 조회 성공", review },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 조회 실패" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;
    const { rating, content } = await req.json().catch(() => ({}));

    const errors: string[] = [];
    if (rating === undefined) errors.push("rating");
    if (!content) errors.push("content");

    if (errors.length > 0) {
      return NextResponse.json(
        { message: errors.join(", ") + "을(를) 입력해주세요." },
        { status: 400 }
      );
    }

    const db = getDb();
    const review = db.prepare("SELECT * FROM reviews WHERE id = ?").get(id) as
      | Review
      | undefined;
    if (!review) {
      return NextResponse.json(
        { message: "리뷰가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedReview: Review = {
      id: Number(id),
      rating,
      content,
      userId: review.userId,
      bookId: review.bookId,
      createdAt: review.createdAt
    };

    return NextResponse.json(
      {
        message: "리뷰 수정 성공",
        review: updatedReview
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 수정 실패" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
  const { id } = await params;
  const { rating, content } = await req.json().catch(() => ({}));

  if (rating === undefined && !content) {
    return NextResponse.json(
      { message: "수정할 데이터가 없습니다." },
      { status: 400 }
    );
  }

  try {
    // DB에서 기존 리뷰 조회
    const db = getDb();
    const review = db.prepare("SELECT * FROM reviews WHERE id = ?").get(id) as
      | Review
      | undefined;
    if (!review) {
      return NextResponse.json(
        { message: "리뷰가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedReview: Review = {
      id: Number(id),
      rating: rating ?? review.rating,
      content: content ?? review.content,
      userId: review.userId,
      bookId: review.bookId,
      createdAt: review.createdAt
    };

    return NextResponse.json(
      {
        message: "리뷰 수정 성공",
        review: updatedReview
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 수정 실패" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  const { id } = await params;

  try {
    const db = getDb();
    const review = db.prepare("SELECT * FROM reviews WHERE id = ?").get(id) as
      | Review
      | undefined;
    if (!review) {
      return NextResponse.json(
        { message: "리뷰가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: `${id}번 리뷰 삭제 성공` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 삭제 실패" }, { status: 500 });
  }
}
