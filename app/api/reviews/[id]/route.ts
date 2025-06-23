import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Review } from "@/src/types/review-type";

interface IParams {
  params: Promise<{ id: string }>;
}

const dbFile = path.resolve(process.cwd(), "src/db/reviews.json");
const dbPromise = JSONFilePreset<{ reviews: Review[] }>(dbFile, {
  reviews: []
});

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "id를 입력해주세요." },
        { status: 400 }
      );
    }

    const db = await dbPromise;
    const review = db.data.reviews.find((r) => r.id === parseInt(id, 10));

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

    if (!id) {
      return NextResponse.json(
        { message: "id를 입력해주세요." },
        { status: 400 }
      );
    }

    const { rating, content } = await req.json().catch(() => ({}));

    const errors: string[] = [];
    if (rating === undefined) errors.push("rating");
    if (!content) errors.push("content");

    if (errors.length > 0) {
      return NextResponse.json(
        { messages: errors.join(", ") + "을(를) 입력해주세요." },
        { status: 400 }
      );
    }

    const db = await dbPromise;
    const idx = db.data.reviews.findIndex((r) => r.id === parseInt(id, 10));

    if (idx === -1) {
      return NextResponse.json(
        { message: "리뷰가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedReview: Review = {
      ...db.data.reviews[idx],
      rating,
      content
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

  if (!id) {
    return NextResponse.json(
      { message: "id를 입력해주세요." },
      { status: 400 }
    );
  }

  const { rating, content } = await req.json().catch(() => ({}));

  if (rating === undefined && !content) {
    return NextResponse.json(
      { message: "수정할 데이터가 없습니다." },
      { status: 400 }
    );
  }

  try {
    const db = await dbPromise;
    const idx = db.data.reviews.findIndex((r) => r.id === parseInt(id, 10));

    if (idx === -1) {
      return NextResponse.json(
        { message: "리뷰가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedReview: Review = {
      ...db.data.reviews[idx],
      ...(rating !== undefined && { rating }),
      ...(content !== undefined && { content })
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

  if (!id) {
    return NextResponse.json(
      { message: "id를 입력해주세요." },
      { status: 400 }
    );
  }

  try {
    const db = await dbPromise;
    const idx = db.data.reviews.findIndex((r) => r.id === parseInt(id, 10));

    if (idx === -1) {
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
