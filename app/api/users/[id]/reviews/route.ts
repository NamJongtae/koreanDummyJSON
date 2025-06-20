import executeQuery from "@/src/db/db";
import { Review } from "@/src/types/review-type";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: Promise<{ id: string }>;
}
export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    const sql =
      "SELECT users.id, reviews.id AS reviewId, reviews.rating, reviews.content, reviews.createdAt FROM users INNER JOIN reviews ON users.id = reviews.userId where users.id = ?;";
    const reviews = (await executeQuery(sql, [id])) as Review[];

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
