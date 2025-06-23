import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Comment } from "@/src/types/comment-type";
import { Post } from "@/src/types/post-type";

interface IParams {
  params: Promise<{ id: string }>;
}

const postDbFile = path.resolve(process.cwd(), "src/db/posts.json");
const commentDbFile = path.resolve(process.cwd(), "src/db/comments.json");
const postDbPromise = JSONFilePreset<{ posts: Post[] }>(postDbFile, {
  posts: []
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

    const postDb = await postDbPromise;
    const commentDb = await commentDbPromise;

    const post = postDb.data.posts.find((p) => p.id === parseInt(id, 10));
    if (!post) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    // 해당 게시물의 댓글만 필터
    const comments = commentDb.data.comments
      .filter((c) => c.postId === parseInt(id, 10))
      .map((c) => ({
        postId: c.postId,
        commentId: c.id,
        content: c.content,
        createdAt: c.createdAt
      }));

    return NextResponse.json(
      { message: "게시물 댓글 목록 조회 성공", comments },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "게시물 댓글 목록 조회 실패" },
      { status: 500 }
    );
  }
}
