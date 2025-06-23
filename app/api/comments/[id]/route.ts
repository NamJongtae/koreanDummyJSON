import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Comment } from "@/src/types/comment-type";

const dbFile = path.resolve(process.cwd(), "src/db/comments.json");
const dbPromise = JSONFilePreset<{ comments: Comment[] }>(dbFile, {
  comments: []
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "id를 입력해주세요." },
        { status: 400 }
      );
    }
    const db = await dbPromise;
    const comment = db.data.comments.find((c) => c.id === parseInt(id, 10));
    if (!comment) {
      return NextResponse.json(
        { message: "댓글이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "댓글 조회 성공", comment },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "댓글 조회 실패" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { message: "id를 입력해주세요." },
      { status: 400 }
    );
  }
  const { content } = await req.json().catch(() => ({}));
  if (!content) {
    return NextResponse.json(
      { message: "content를 입력해주세요." },
      { status: 400 }
    );
  }
  try {
    const db = await dbPromise;
    const idx = db.data.comments.findIndex((c) => c.id === parseInt(id, 10));
    if (idx === -1) {
      return NextResponse.json(
        { message: "댓글이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }
    const updatedComment: Comment = {
      ...db.data.comments[idx],
      content
    };

    return NextResponse.json(
      {
        message: "댓글 수정 성공",
        comment: updatedComment
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "댓글 수정 실패" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { message: "id를 입력해주세요." },
      { status: 400 }
    );
  }
  const { content } = await req.json().catch(() => ({}));
  if (!content) {
    return NextResponse.json(
      { message: "content를 입력해주세요." },
      { status: 400 }
    );
  }
  try {
    const db = await dbPromise;
    const idx = db.data.comments.findIndex((c) => c.id === parseInt(id, 10));
    if (idx === -1) {
      return NextResponse.json(
        { message: "댓글이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }
    const updatedComment: Comment = {
      ...db.data.comments[idx],
      content
    };

    return NextResponse.json(
      {
        message: "댓글 수정 성공",
        comment: updatedComment
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "댓글 수정 실패" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { message: "id를 입력해주세요." },
      { status: 400 }
    );
  }
  try {
    const db = await dbPromise;
    const idx = db.data.comments.findIndex((c) => c.id === parseInt(id, 10));
    if (idx === -1) {
      return NextResponse.json(
        { message: "댓글이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `${id}번 댓글 삭제 성공` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "댓글 삭제 실패" }, { status: 500 });
  }
}
