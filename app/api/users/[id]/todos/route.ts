import executeQuery from "@/src/db/db";
import { Todo } from "@/src/types/todo-type";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: { id: string };
}
export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id;

    const sql =
      "SELECT users.id, todos.id AS todoId, todos.content, todos.completed FROM users INNER JOIN todos ON users.id = todos.userId where users.id = ?;";
    const todos = (await executeQuery(sql, [id])) as Todo[];
    todos.forEach((todo) => {
      todo.completed = Boolean(todo.completed);
    });

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
