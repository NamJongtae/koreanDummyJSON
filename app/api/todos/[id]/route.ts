import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Todo } from "@/src/types/todo-type";
import { Database as SqliteDatabase } from "sqlite";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  let db: SqliteDatabase | undefined;
  try {
    const { id } = await params;

    db = await getDb();
    const todo = (await db.get("SELECT * FROM todos WHERE id = ?", id)) as
      | Todo
      | undefined;

    if (!todo) {
      return NextResponse.json(
        { message: "할 일이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const result = { ...todo, completed: Boolean(todo.completed) };

    return NextResponse.json(
      { message: "할 일 조회 성공", todo: result },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "할 일 조회 실패" }, { status: 500 });
  } finally {
    if (db) await db.close();
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  let db: SqliteDatabase | undefined;
  try {
    const { id } = await params;
    const { content, completed } = await req.json().catch(() => ({}));

    const errors: string[] = [];
    if (!content) errors.push("content");
    if (completed === undefined) errors.push("completed");

    if (errors.length > 0) {
      return NextResponse.json(
        { message: errors.join(", ") + "을(를) 입력해주세요." },
        { status: 400 }
      );
    }

    db = await getDb();
    const todo = (await db.get("SELECT * FROM todos WHERE id = ?", id)) as
      | Todo
      | undefined;

    if (!todo) {
      return NextResponse.json(
        { message: "할 일이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedTodo: Todo = {
      ...todo,
      content,
      completed: Boolean(completed)
    };

    return NextResponse.json(
      {
        message: "할 일 수정 성공",
        todo: updatedTodo
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "할 일 수정 실패" }, { status: 500 });
  } finally {
    if (db) await db.close();
  }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
  const { id } = await params;
  const { content, completed } = await req.json().catch(() => ({}));

  if (!content && completed === undefined) {
    return NextResponse.json(
      { message: "수정할 데이터가 없습니다." },
      { status: 400 }
    );
  }

  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const todo = (await db.get("SELECT * FROM todos WHERE id = ?", id)) as
      | Todo
      | undefined;

    if (!todo) {
      return NextResponse.json(
        { message: "할 일이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedTodo: Todo = {
      ...todo,
      content: content !== undefined ? content : todo.content,
      completed:
        completed !== undefined ? Boolean(completed) : Boolean(todo.completed)
    };

    return NextResponse.json(
      {
        message: "할 일 수정 성공",
        todo: updatedTodo
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "할 일 수정 실패" }, { status: 500 });
  } finally {
    if (db) await db.close();
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  const { id } = await params;

  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const todo = (await db.get("SELECT * FROM todos WHERE id = ?", id)) as
      | Todo
      | undefined;

    if (!todo) {
      return NextResponse.json(
        { message: "할 일이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `${id}번 할 일 삭제 성공` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "할 일 삭제 실패" }, { status: 500 });
  } finally {
    if (db) await db.close();
  }
}
