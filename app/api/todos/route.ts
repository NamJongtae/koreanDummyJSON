import executeQuery from "@/src/db/db";
import { Todo } from "@/src/types/todo-type";
import { NextRequest, NextResponse } from "next/server";

// /api/todos
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // page와 limit 값을 가져옵니다.
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const userId = searchParams.get("userId");

    // /api/todos?userId={userId} 유저 아이디별 할 일 목록
    if (userId) {
      try {
        const todos = (await executeQuery(
          "SELECT * FROM todos where userId = ?",
          [userId]
        )) as Todo[];

        todos.forEach((todo) => {
          todo.completed = Boolean(todo.completed);
        });

        return NextResponse.json(
          {
            message: "할 일 목록 조회 성공",
            todos
          },
          { status: 200 }
        );
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { message: "할 일 목록 조회 실패" },
          { status: 500 }
        );
      }
    }

    let sql;
    let values: Array<number> = [];
    let offset: number | null = null;

    if (page && limit) {
      // 페이지네이션 계산
      offset = (parseInt(page) - 1) * parseInt(limit);

      // SQL 쿼리에 LIMIT과 OFFSET 적용
      // /api/todos?page={page}&limit={limit} 할 일 목록 페이지
      sql = "SELECT * FROM todos LIMIT ? OFFSET ?";
      values = [parseInt(limit), offset];
    } else {
      // page 또는 limit가 없으면 전체 데이터를 조회
      // /api/todos 할 일 목록
      sql = "SELECT * FROM todos";
    }

    // 데이터베이스 쿼리 실행
    const data = await executeQuery(sql, values);

    // hasNextPage 계산
    const totalTodos = 200;
    const hasNextPage =
      offset !== null && offset + parseInt(limit || "0") < totalTodos;

    // 응답 객체 생성
    const response: {
      message: string;
      todos: Todo[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "할 일 목록 조회 성공",
      todos: data as Todo[]
    };

    // 조건에 따라 page, limit, hasNextPage 추가
    if (page) response.page = parseInt(page);
    if (limit) response.limit = parseInt(limit);
    if (hasNextPage !== null) response.hasNextPage = hasNextPage;
    // 숫자 형식 boolean 형식으로 변환
    response.todos.forEach((todo) => {
      todo.completed = Boolean(todo.completed);
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "할 일 목록 조회 실패" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { content = "" } = await await req.json().catch(() => ({}));

  try {
    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = { id: 201, content, completed: false };
    return NextResponse.json(
      {
        message: "할 일 생성 성공",
        todo: dummyData
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
  }
}
