import { NextRequest, NextResponse } from "next/server";
import { User } from "@/src/types/user-type";
import { getDb } from "@/src/db/sqlite";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    let limit = searchParams.get("limit");

    const db = getDb();
    const totalUsers: number = (
      db.prepare("SELECT COUNT(*) as count FROM users").get() as {
        count: number;
      }
    ).count;

    let sql = "SELECT * FROM users";
    let values: number[] = [];
    let offset: number | null = null;
    let hasNextPage: boolean | null = null;

    if (page && !limit) limit = "10";

    if (page && limit) {
      offset = (parseInt(page) - 1) * parseInt(limit);
      sql += " LIMIT ? OFFSET ?";
      values = [parseInt(limit), offset];
      hasNextPage = offset + parseInt(limit) < totalUsers;
    } else if (!page && limit) {
      sql += " LIMIT ?";
      values = [parseInt(limit)];
    }

    const users: User[] =
      values.length > 0
        ? (db.prepare(sql).all(...values) as User[])
        : (db.prepare(sql).all() as User[]);

    const response: {
      message: string;
      users: User[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "유저 목록 조회 성공",
      users
    };
    if (page) response.page = parseInt(page);
    if (limit) response.limit = parseInt(limit);
    if (hasNextPage !== null) response.hasNextPage = hasNextPage;

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "유저 목록 조회 실패" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { username, phone, address, email } = await req
    .json()
    .catch(() => ({}));
  const errors: string[] = [];
  if (!username) errors.push("username");
  if (!phone) errors.push("phone");
  if (!address) errors.push("address");
  if (!email) errors.push("email");
  if (errors.length > 0) {
    return NextResponse.json(
      { messages: errors.join(", ") + "을(를) 입력해주세요." },
      { status: 400 }
    );
  }

  const dummyUser: User = {
    id: 21,
    username,
    phone,
    address,
    email,
    createdAt: new Date().toISOString()
  };
  return NextResponse.json(
    {
      message: "유저 생성 성공",
      user: dummyUser
    },
    { status: 201 }
  );
}
