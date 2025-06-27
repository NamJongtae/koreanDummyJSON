import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Comment } from "@/src/types/comment-type";
import { Database as SqliteDatabase } from "sqlite";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  let db: SqliteDatabase | undefined;
  try {
    const { id } = await params;
    db = await getDb();
    const comment = (await db.get(
      "SELECT * FROM comments WHERE id = ?",
      id
    )) as Comment | undefined;
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
  } finally {
    if (db) await db.close();
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  const { id } = await params;

  const { content } = await req.json().catch(() => ({}));
  if (!content) {
    return NextResponse.json(
      { message: "content를 입력해주세요." },
      { status: 400 }
    );
  }
  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const comment = (await db.get(
      "SELECT * FROM comments WHERE id = ?",
      id
    )) as Comment | undefined;
    if (!comment) {
      return NextResponse.json(
        { message: "댓글이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedComment: Comment = {
      ...comment,
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
  } finally {
    if (db) await db.close();
  }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
  const { id } = await params;

  const { content } = await req.json().catch(() => ({}));
  if (!content) {
    return NextResponse.json(
      { message: "content를 입력해주세요." },
      { status: 400 }
    );
  }
  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const comment = (await db.get(
      "SELECT * FROM comments WHERE id = ?",
      id
    )) as Comment | undefined;
    if (!comment) {
      return NextResponse.json(
        { message: "댓글이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedComment: Comment = {
      ...comment,
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
  } finally {
    if (db) await db.close();
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  const { id } = await params;

  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const comment = (await db.get(
      "SELECT * FROM comments WHERE id = ?",
      id
    )) as Comment | undefined;
    if (!comment) {
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
  } finally {
    if (db) await db.close();
  }
}
