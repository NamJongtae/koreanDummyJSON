import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Todo } from "@/src/types/todo-type";

interface IParams {
  params: Promise<{ id: string }>;
}

const dbFile = path.resolve(process.cwd(), "src/db/todos.json");
const dbPromise = JSONFilePreset<{ todos: Todo[] }>(dbFile, { todos: [] });

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
    const todo = db.data.todos.find((t) => t.id === parseInt(id, 10));

    if (!todo) {
      return NextResponse.json(
        { message: "할 일이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const result = { ...todo, completed: todo.completed };

    return NextResponse.json(
      { message: "할 일 조회 성공", todo: result },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "할 일 조회 실패" }, { status: 500 });
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

    const db = await dbPromise;
    const idx = db.data.todos.findIndex((t) => t.id === parseInt(id, 10));

    if (idx === -1) {
      return NextResponse.json(
        { message: "할 일이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedTodo: Todo = {
      ...db.data.todos[idx],
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

  const { content, completed } = await req.json().catch(() => ({}));

  if (!content && completed === undefined) {
    return NextResponse.json(
      { message: "수정할 데이터가 없습니다." },
      { status: 400 }
    );
  }

  try {
    const db = await dbPromise;
    const idx = db.data.todos.findIndex((t) => t.id === parseInt(id, 10));

    if (idx === -1) {
      return NextResponse.json(
        { message: "할 일이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedTodo: Todo = {
      ...db.data.todos[idx],
      ...(content !== undefined && { content }),
      ...(completed !== undefined && { completed: Boolean(completed) })
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
    const idx = db.data.todos.findIndex((t) => t.id === parseInt(id, 10));

    if (idx === -1) {
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
  }
}
