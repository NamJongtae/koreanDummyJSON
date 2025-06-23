import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Post } from "@/src/types/post-type";

const dbFile = path.resolve(process.cwd(), "src/db/posts.json");
const dbPromise = JSONFilePreset<{ posts: Post[] }>(dbFile, { posts: [] });

export async function GET(req: NextRequest) {
  try {
    const db = await dbPromise;
    const posts: Post[] = db.data.posts;

    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    let limit = searchParams.get("limit");
    const userId = searchParams.get("userId");

    let filtered = posts;

    // userId로 필터
    if (userId) {
      filtered = filtered.filter((p) => p.userId === parseInt(userId, 10));
      return NextResponse.json(
        {
          message: "게시물 목록 조회 성공",
          posts: filtered
        },
        { status: 200 }
      );
    }

    // 페이지네이션
    let offset: number | null = null;
    let hasNextPage: boolean | null = null;

    if (page && !limit) {
      limit = "10";
    }

    let result = filtered;
    if (page && limit) {
      offset = (parseInt(page) - 1) * parseInt(limit);
      result = filtered.slice(offset, offset + parseInt(limit));
      const totalPosts = filtered.length;
      hasNextPage =
        offset !== null && offset + parseInt(limit || "0") < totalPosts;
    } else if (!page && limit) {
      result = filtered.slice(0, parseInt(limit));
    }

    const response: {
      message: string;
      posts: Post[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "게시물 목록 조회 성공",
      posts: result
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
      { messages: errors.join(", ") + "을(를) 입력해주세요." },
      { status: 400 }
    );
  }

  try {
    const db = await dbPromise;
    const posts: Post[] = db.data.posts;
    const newId =
      posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    const newPost: Post = {
      id: newId,
      title,
      content,
      imgUrl,
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
      userId: 1 
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
