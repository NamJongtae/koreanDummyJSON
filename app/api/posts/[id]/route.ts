import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/src/types/post-type";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;
    const db = await getDb();
    const post = (await db.get("SELECT * FROM posts WHERE id = ?", id)) as
      | Post
      | undefined;
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

    const db = await getDb();
    const post = (await db.get("SELECT * FROM posts WHERE id = ?", id)) as
      | Post
      | undefined;
    if (!post) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedPost: Post = {
      ...post,
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
  const { title, content, imgUrl } = await req.json().catch(() => ({}));

  if (!title && !content && !imgUrl) {
    return NextResponse.json(
      { message: "수정할 데이터가 없습니다." },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();
    const post = (await db.get("SELECT * FROM posts WHERE id = ?", id)) as
      | Post
      | undefined;
    if (!post) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedPost: Post = {
      ...post,
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

  try {
    const db = await getDb();
    const post = (await db.get("SELECT * FROM posts WHERE id = ?", id)) as
      | Post
      | undefined;
    if (!post) {
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
