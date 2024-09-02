import executeQuery from "@/src/db/db";
import { Post } from "@/src/types/post-type";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: {
    id: string;
  };
}

// /api/posts/:id
export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id;

    const sql = "SELECT * FROM posts where id = ?";
    const posts = (await executeQuery(sql, [id])) as Post[];

    if (posts.length === 0) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "게시물 조회 성공", post: posts[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "게시물 조회 실패" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id;
    const { title, content, imgUrl } = await req.json().catch(() => ({}));

    // 데이터베이스에서 실제 데이터를 조회
    const posts = (await executeQuery("SELECT * FROM posts WHERE id = ?", [
      id
    ])) as Post[];

    if (posts.length === 0) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "게시물 수정 성공",
        post: {
          id: posts[0].id,
          title,
          content,
          imgUrl,
          createdAt: posts[0].createdAt,
          userId: posts[0].userId
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "게시물 수정 실패" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
  const id = params.id;
  const { title, content, imgUrl } = await req.json().catch(() => ({}));

  try {
    // 데이터베이스에서 실제 데이터를 조회
    const posts = (await executeQuery("SELECT * FROM posts WHERE id = ?", [
      id
    ])) as Post[];

    if (posts.length === 0) {
      return NextResponse.json(
        { message: "게시물이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = {
      ...posts[0],
      ...(title !== undefined && { title }),
      ...(content !== undefined && { content }),
      ...(imgUrl !== undefined && { imgUrl })
    };

    return NextResponse.json(
      {
        message: "게시물 수정 성공",
        post: dummyData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: "게시물 삭제 성공" }, { status: 200 });
}
