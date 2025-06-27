import { getDb } from "@/src/db/sqlite";
import { Todo } from "@/src/types/todo-type";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    const db = await getDb();
    const user = await db.get("SELECT * FROM users WHERE id = ?", id);
    if (!user) {
      return NextResponse.json(
        { message: "유저가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }
    const todos = (await db.all(
      "SELECT id as todoId, content, completed FROM todos WHERE userId = ?",
      id
    )) as Array<{ todoId: number; content: string; completed: number }>;

    const todosWithBoolean = todos.map((t) => ({
      ...t,
      completed: Boolean(t.completed)
    }));

    return NextResponse.json(
      { message: "유저 할 일 목록 조회 성공", todos: todosWithBoolean },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "유저 할 일 목록 조회 실패" },
      { status: 500 }
    );
  }
}
