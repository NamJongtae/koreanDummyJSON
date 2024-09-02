import executeQuery from "@/src/db/db";
import { Comment } from "@/src/types/comment-type";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: {
    id: string;
  };
}

// /api/comments/:id
export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id;

    const sql = "SELECT * FROM comments where id = ?";
    const comments = (await executeQuery(sql, [id])) as Comment[];

    if (comments.length === 0) {
      return NextResponse.json(
        { message: "댓글이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "댓글 조회 성공", comment: comments[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "댓글 조회 실패" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  const id = params.id;
  const { title, content, imgUrl } = await req.json().catch(() => ({}));

  try {
    // 데이터베이스에서 실제 데이터를 조회
    const comments = (await executeQuery(
      "SELECT * FROM comments WHERE id = ?",
      [id]
    )) as Comment[];

    if (comments.length === 0) {
      return NextResponse.json(
        { message: "댓글이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = {
      id: comments[0].id,
      title,
      content,
      imgUrl,
      createdAt: comments[0].createdAt,
      userId: comments[0].userId,
      postId: comments[0].postId
    };

    return NextResponse.json(
      {
        message: "댓글 수정 성공",
        comment: dummyData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "댓글 수정 실패" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
  const id = params.id;
  const { title, content, imgUrl } = await req.json().catch(() => ({}));

  try {
    // 데이터베이스에서 실제 데이터를 조회
    const comments = (await executeQuery(
      "SELECT * FROM comments WHERE id = ?",
      [id]
    )) as Comment[];

    if (comments.length === 0) {
      return NextResponse.json(
        { message: "댓글이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = {
      ...comments[0],
      ...(title !== undefined && { title }),
      ...(content !== undefined && { content }),
      ...(imgUrl !== undefined && { imgUrl })
    };

    return NextResponse.json(
      {
        message: "댓글 수정 성공",
        comment: dummyData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "댓글 수정 실패" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: "댓글 삭제 성공" }, { status: 200 });
}
