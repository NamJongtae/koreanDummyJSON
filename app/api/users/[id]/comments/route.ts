import executeQuery from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: { id: string };
}
export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id;

    const sql =
      "SELECT users.id, comments.id AS commentId, comments.content, comments.createdAt FROM users INNER JOIN comments ON users.id = comments.userId where users.id = ?;";
    const comments = (await executeQuery(sql, [id])) as Comment[];

    return NextResponse.json(
      { message: "유저 댓글 목록 조회 성공", comments },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "유저 댓글 목록 조회 실패" },
      { status: 500 }
    );
  }
}
