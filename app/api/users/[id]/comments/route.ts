import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Comment } from "@/src/types/comment-type";
import { User } from "@/src/types/user-type";

interface IParams {
  params: Promise<{ id: string }>;
}

const userDbFile = path.resolve(process.cwd(), "src/db/users.json");
const commentDbFile = path.resolve(process.cwd(), "src/db/comments.json");
const userDbPromise = JSONFilePreset<{ users: User[] }>(userDbFile, {
  users: []
});
const commentDbPromise = JSONFilePreset<{ comments: Comment[] }>(
  commentDbFile,
  { comments: [] }
);

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "id를 입력해주세요." },
        { status: 400 }
      );
    }

    const userDb = await userDbPromise;
    const user = userDb.data.users.find((u) => u.id === parseInt(id, 10));
    if (!user) {
      return NextResponse.json(
        { message: "해당 유저가 존재하지 않습니다." },
        { status: 404 }
      );
    }

    const commentDb = await commentDbPromise;
    const comments = commentDb.data.comments
      .filter((c) => c.userId === parseInt(id, 10))
      .map((c) => ({
        commentId: c.id,
        content: c.content,
        createdAt: c.createdAt
      }));

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
