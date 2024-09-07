import executeQuery from "@/src/db/db";
import { Todo } from "@/src/types/todo-type";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: {
    id: string;
  };
}

// /api/todos/:id
export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ message: "id가 존재하지 않습니다." });
    }

    const sql = "SELECT * FROM todos where id = ?";
    const data = (await executeQuery(sql, [id])) as Todo[];
    data[0].completed = Boolean(data[0].completed);

    return NextResponse.json(
      { message: "할 일 조회 성공", todo: data[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "할 일 조회 실패" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id;
    const { content, completed } = await req.json().catch(() => ({}));

    // 데이터베이스에서 실제 데이터를 조회
    const todos = (await executeQuery("SELECT * FROM todos WHERE id = ?", [
      id
    ])) as Todo[];

    if (todos.length === 0) {
      return NextResponse.json(
        { message: "할 일이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "할 일 수정 성공",
        todo: {
          id: todos[0].id,
          content,
          completed,
          userId: todos[0].userId
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "할 일 수정 실패" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
  const id = params.id;
  const { content, completed } = await req.json().catch(() => ({}));

  try {
    // 데이터베이스에서 실제 데이터를 조회
    const todos = (await executeQuery("SELECT * FROM todos WHERE id = ?", [
      id
    ])) as Todo[];

    if (todos.length === 0) {
      return NextResponse.json(
        { message: "할 일이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = {
      ...todos[0],
      ...(content !== undefined && { content }),
      ...(completed !== undefined && { completed })
    };

    return NextResponse.json(
      {
        message: "할 일 수정 성공",
        todo: dummyData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "할 일 수정 실패" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  const { id } = params;

  const todos = (await executeQuery("SELECT * FROM todos WHERE id = ?", [
    id
  ])) as Todo[];

  if (todos.length === 0) {
    return NextResponse.json(
      { message: "할 일이 존재하지 않습니다. id 값을 확인해주세요." },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: `${id}번 할 일 삭제 성공` },
    { status: 200 }
  );
}
