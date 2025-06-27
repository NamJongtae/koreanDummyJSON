import { getDb } from "@/src/db/sqlite";
import { User } from "@/src/types/user-type";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    const db = await getDb();
    const user = (await db.get("SELECT * FROM users WHERE id = ?", id)) as
      | User
      | undefined;

    if (!user) {
      return NextResponse.json(
        { message: "유저가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "유저 조회 성공", user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "유저 조회 실패" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;
    const { username, email, phone, address } = await req
      .json()
      .catch(() => ({}));

    const errors: string[] = [];
    if (!username) errors.push("username");
    if (!email) errors.push("email");
    if (!phone) errors.push("phone");
    if (!address) errors.push("address");

    if (errors.length > 0) {
      return NextResponse.json(
        { message: errors.join(", ") + "을(를) 입력해주세요." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const user = (await db.get("SELECT * FROM users WHERE id = ?", id)) as
      | User
      | undefined;

    if (!user) {
      return NextResponse.json(
        { message: "유저가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "유저 수정 성공",
        user: {
          id: user.id,
          username,
          email,
          phone,
          address,
          createdAt: user.createdAt
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
  const { id } = await params;
  const { username, email, phone, address } = await req
    .json()
    .catch(() => ({}));

  if (!username && !email && !phone && !address) {
    return NextResponse.json(
      { message: "수정할 데이터가 없습니다." },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();
    const user = (await db.get("SELECT * FROM users WHERE id = ?", id)) as
      | User
      | undefined;

    if (!user) {
      return NextResponse.json(
        { message: "유저가 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const dummyData = {
      ...user,
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
  const { id } = await params;

  const db = await getDb();
  const user = (await db.get("SELECT * FROM users WHERE id = ?", id)) as
    | User
    | undefined;

  if (!user) {
    return NextResponse.json(
      { message: "유저가 존재하지 않습니다. id 값을 확인해주세요." },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: `${id}번 유저 삭제 성공` },
    { status: 200 }
  );
}
