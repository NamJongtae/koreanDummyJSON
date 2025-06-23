import { JSONFilePreset } from "lowdb/node";
import { Todo } from "@/src/types/todo-type";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

interface IParams {
  params: Promise<{ id: string }>;
}

const todoDbFile = path.resolve(process.cwd(), "src/db/todos.json");
const todoDbPromise = JSONFilePreset<{ todos: Todo[] }>(todoDbFile, {
  todos: []
});

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "id를 입력해주세요." },
        { status: 400 }
      );
    }

    const todoDb = await todoDbPromise;
    const todos = todoDb.data.todos
      .filter((t) => t.userId === parseInt(id, 10))
      .map((t) => ({
        todoId: t.id,
        content: t.content,
        completed: Boolean(t.completed)
      }));

    return NextResponse.json(
      { message: "유저 할 일 목록 조회 성공", todos },
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
