import { JSONFilePreset } from "lowdb/node";
import { Review } from "@/src/types/review-type";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

interface IParams {
  params: Promise<{ id: string }>;
}

const reviewDbFile = path.resolve(process.cwd(), "src/db/reviews.json");
const reviewDbPromise = JSONFilePreset<{ reviews: Review[] }>(reviewDbFile, {
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

    const reviewDb = await reviewDbPromise;
    const reviews = reviewDb.data.reviews
      .filter((r) => r.userId === parseInt(id, 10))
      .map((r) => ({
        reviewId: r.id,
        rating: r.rating,
        content: r.content,
        createdAt: r.createdAt
      }));

    return NextResponse.json(
      { message: "유저 리뷰 목록 조회 성공", reviews },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "유저 리뷰 목록 조회 실패" },
      { status: 500 }
    );
  }
}
