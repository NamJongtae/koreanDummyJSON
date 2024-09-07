import executeQuery from "@/src/db/db";
import { User } from "@/src/types/user-type";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: {
    id: string;
  };
}

// /api/user/:id
export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id;

    const sql = "SELECT * FROM users where id = ?";
    const users = (await executeQuery(sql, [id])) as User[];

    if (users.length === 0) {
      return NextResponse.json(
        { message: "유저가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "유저 조회 성공", user: users[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "유저 조회 실패" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id;
    const { username, email, phone, address } = await req
      .json()
      .catch(() => ({}));

    // 데이터베이스에서 실제 데이터를 조회
    const users = (await executeQuery("SELECT * FROM users WHERE id = ?", [
      id
    ])) as User[];

    if (users.length === 0) {
      return NextResponse.json(
        { message: "유저가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "유저 수정 성공",
        user: {
          id: users[0].id,
          username,
          email,
          phone,
          address,
          createdAt: users[0].createdAt
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "유저 수정 실패" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
  const id = params.id;
  const { username, email, phone, address } = await req
    .json()
    .catch(() => ({}));

  try {
    // 데이터베이스에서 실제 데이터를 조회
    const users = (await executeQuery("SELECT * FROM users WHERE id = ?", [
      id
    ])) as User[];

    if (users.length === 0) {
      return NextResponse.json(
        { message: "유저가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 200 }
      );
    }

    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = {
      ...users[0],
      ...(username !== undefined && { username }),
      ...(email !== undefined && { email }),
      ...(phone !== undefined && { phone }),
      ...(address !== undefined && { address })
    };

    return NextResponse.json(
      {
        message: "유저 수정 성공",
        user: dummyData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "유저 수정 실패" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  const { id } = params;

  const users = (await executeQuery("SELECT * FROM users WHERE id = ?", [
    id
  ])) as User[];

  if (users.length === 0) {
    return NextResponse.json(
      { message: "유저가 존재하지 않습니다. id 값을 확인해주세요." },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: `${id}번 유저 삭제 성공` },
    { status: 200 }
  );
}
