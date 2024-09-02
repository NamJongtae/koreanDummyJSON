import executeQuery from "@/src/db/db";
import { Review } from "@/src/types/review-type";

import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: {
    id: string;
  };
}

// /api/reviews/:id
export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id;

    const sql = "SELECT * FROM reviews where id = ?";
    const reviews = (await executeQuery(sql, [id])) as Review[];

    if (reviews.length === 0) {
      return NextResponse.json(
        { message: "리뷰가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "리뷰 조회 성공", review: reviews[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 조회 실패" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id;
    const { rating, content } = await req.json().catch(() => ({}));

    // 데이터베이스에서 실제 데이터를 조회
    const reviews = (await executeQuery("SELECT * FROM reviews WHERE id = ?", [
      id
    ])) as Review[];

    if (reviews.length === 0) {
      return NextResponse.json(
        { message: "리뷰가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "리뷰 수정 성공",
        user: {
          id: reviews[0].id,
          rating,
          content,
          userId: reviews[0].userId,
          bookId: reviews[0].bookId,
          createdAt: reviews[0].createdAt
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 수정 실패" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
  const id = params.id;
  const { rating, content } = await req.json().catch(() => ({}));

  try {
    // 데이터베이스에서 실제 데이터를 조회
    const reviews = (await executeQuery("SELECT * FROM reviews WHERE id = ?", [
      id
    ])) as Review[];

    if (reviews.length === 0) {
      return NextResponse.json(
        { message: "리뷰가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 200 }
      );
    }

    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = {
      ...reviews[0],
      ...(rating !== undefined && { rating }),
      ...(content !== undefined && { content })
    };

    return NextResponse.json(
      {
        message: "리뷰 수정 성공",
        user: dummyData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 수정 실패" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: "리뷰 삭제 성공" }, { status: 200 });
}
