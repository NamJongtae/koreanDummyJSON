import { JSONFilePreset } from "lowdb/node";
import { Post } from "@/src/types/post-type";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

interface IParams {
  params: Promise<{ id: string }>;
}

const postDbFile = path.resolve(process.cwd(), "src/db/posts.json");
const postDbPromise = JSONFilePreset<{ posts: Post[] }>(postDbFile, {
  posts: []
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

    const postDb = await postDbPromise;
    const posts = postDb.data.posts
      .filter((p) => p.userId === parseInt(id, 10))
      .map((p) => ({
        postId: p.id,
        title: p.title,
        content: p.content,
        imgUrl: p.imgUrl,
        createdAt: p.createdAt
      }));

    return NextResponse.json(
      { message: "유저 게시물 목록 조회 성공", posts },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "유저 게시물 목록 조회 실패" },
      { status: 500 }
    );
  }
}
