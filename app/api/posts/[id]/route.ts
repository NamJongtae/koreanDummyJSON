import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Post } from "@/src/types/post-type";

interface IParams {
  params: Promise<{ id: string }>;
}

const dbFile = path.resolve(process.cwd(), "src/db/posts.json");
const dbPromise = JSONFilePreset<{ posts: Post[] }>(dbFile, { posts: [] });

// /api/posts/:id
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
    const post = db.data.posts.find((p) => p.id === parseInt(id, 10));

    if (!post) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "게시물 조회 성공", post },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "게시물 조회 실패" }, { status: 500 });
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

    const { title, content, imgUrl } = await req.json().catch(() => ({}));

    // 에러 메시지 배열 생성
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

    const db = await dbPromise;
    const idx = db.data.posts.findIndex((p) => p.id === parseInt(id, 10));

    if (idx === -1) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedPost: Post = {
      ...db.data.posts[idx],
      title,
      content,
      imgUrl
    };

    return NextResponse.json(
      {
        message: "게시물 수정 성공",
        post: updatedPost
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "게시물 수정 실패" }, { status: 500 });
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

  const { title, content, imgUrl } = await req.json().catch(() => ({}));

  if (!title && !content && !imgUrl) {
    return NextResponse.json(
      { message: "수정할 데이터가 없습니다." },
      { status: 400 }
    );
  }

  try {
    const db = await dbPromise;
    const idx = db.data.posts.findIndex((p) => p.id === parseInt(id, 10));

    if (idx === -1) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedPost: Post = {
      ...db.data.posts[idx],
      ...(title !== undefined && { title }),
      ...(content !== undefined && { content }),
      ...(imgUrl !== undefined && { imgUrl })
    };

    return NextResponse.json(
      {
        message: "게시물 수정 성공",
        post: updatedPost
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "게시물 수정 실패" }, { status: 500 });
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
    const idx = db.data.posts.findIndex((p) => p.id === parseInt(id, 10));

    if (idx === -1) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `${id}번 게시물 삭제 성공` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "게시물 삭제 실패" }, { status: 500 });
  }
}
