import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/src/types/post-type";

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    let limit = searchParams.get("limit");
    const userId = searchParams.get("userId");

    let query = "SELECT * FROM posts";
    const params: string[] = [];

    if (userId) {
      query += " WHERE userId = ?";
      params.push(userId);
    }

    const posts = db.prepare(query).all(...params) as Post[];

    // 페이지네이션
    let pagedPosts = posts;
    let hasNextPage: boolean | null = null;
    if (page && !limit) limit = "10";
    if (page && limit) {
      const offset = (parseInt(page) - 1) * parseInt(limit);
      pagedPosts = posts.slice(offset, offset + parseInt(limit));
      hasNextPage = offset + parseInt(limit) < posts.length;
    } else if (!page && limit) {
      pagedPosts = posts.slice(0, parseInt(limit));
    }

    const response: {
      message: string;
      posts: Post[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "게시물 목록 조회 성공",
      posts: pagedPosts
    };

    if (page) response.page = parseInt(page);
    if (limit) response.limit = parseInt(limit);
    if (hasNextPage !== null) response.hasNextPage = hasNextPage;

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "게시물 목록 조회 실패" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { title, content, imgUrl } = await req.json().catch(() => ({}));

  const errors: string[] = [];
  if (!title) errors.push("title");
  if (!content) errors.push("content");
  if (!imgUrl) errors.push("imgUrl");

  if (errors.length > 0) {
    return NextResponse.json(
      { message: errors.join(", ") + "을(를) 입력해주세요." },
      { status: 400 }
    );
  }

  try {
    const newId = 101;
    const createdAt = new Date().toISOString().replace("T", " ").slice(0, 19);
    const userId = 1;

    const newPost: Post = {
      id: newId,
      title,
      content,
      imgUrl,
      createdAt,
      userId
    };

    return NextResponse.json(
      {
        message: "게시물 생성 성공",
        post: newPost
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "게시물 생성 실패" }, { status: 500 });
  }
}
