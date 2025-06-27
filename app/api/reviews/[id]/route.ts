import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Review } from "@/src/types/review-type";
import { Database as SqliteDatabase } from "sqlite";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  let db: SqliteDatabase | undefined;
  try {
    const { id } = await params;

    db = await getDb();
    const review = (await db.get("SELECT * FROM reviews WHERE id = ?", id)) as
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
  } finally {
    if (db) await db.close();
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  let db: SqliteDatabase | undefined;
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

    db = await getDb();
    const review = (await db.get("SELECT * FROM reviews WHERE id = ?", id)) as
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
  } finally {
    if (db) await db.close();
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

  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const review = (await db.get("SELECT * FROM reviews WHERE id = ?", id)) as
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
  } finally {
    if (db) await db.close();
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  const { id } = await params;

  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const review = (await db.get("SELECT * FROM reviews WHERE id = ?", id)) as
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
  } finally {
    if (db) await db.close();
  }
}
