import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Todo } from "@/src/types/todo-type";
import { Database as SqliteDatabase } from "sqlite";

export async function GET(req: NextRequest) {
  let db: SqliteDatabase | undefined;
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    let limit = searchParams.get("limit");
    const userId = searchParams.get("userId");

    db = await getDb();
    let query = "SELECT * FROM todos";
    const params: string[] = [];

    if (userId) {
      query += " WHERE userId = ?";
      params.push(userId);
    }

    let todos = (await db.all(query, ...params)) as Todo[];

    todos = todos.map((todo) => ({
      ...todo,
      completed: Boolean(todo.completed)
    }));

    // 페이지네이션
    let pagedTodos = todos;
    let hasNextPage: boolean | null = null;
    if (page && !limit) limit = "10";
    if (page && limit) {
      const offset = (parseInt(page) - 1) * parseInt(limit);
      pagedTodos = todos.slice(offset, offset + parseInt(limit));
      hasNextPage = offset + parseInt(limit) < todos.length;
    } else if (!page && limit) {
      pagedTodos = todos.slice(0, parseInt(limit));
    }

    const response: {
      message: string;
      todos: Todo[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "할 일 목록 조회 성공",
      todos: pagedTodos
    };
    if (page) response.page = parseInt(page);
    if (limit) response.limit = parseInt(limit);
    if (hasNextPage !== null) response.hasNextPage = hasNextPage;

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "할 일 목록 조회 실패" },
      { status: 500 }
    );
  } finally {
    if (db) await db.close();
  }
}

export async function POST(req: NextRequest) {
  const { content, userId = 1 } = await req.json().catch(() => ({}));

  if (!content) {
    return NextResponse.json(
      { message: "content를 입력해주세요." },
      { status: 400 }
    );
  }

  const newTodo: Todo = {
    id: 201,
    content,
    completed: false,
    userId
  };

  return NextResponse.json(
    {
      message: "할 일 생성 성공",
      todo: { ...newTodo, completed: Boolean(newTodo.completed) }
    },
    { status: 201 }
  );
}
