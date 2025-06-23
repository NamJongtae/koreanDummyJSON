import { JSONFilePreset } from "lowdb/node";
import { User } from "@/src/types/user-type";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const dbFile = path.resolve(process.cwd(), "src/db/users.json");
const dbPromise = JSONFilePreset<{ users: User[] }>(dbFile, { users: [] });

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    let limit = searchParams.get("limit");

    const db = await dbPromise;
    const users = db.data.users;

    // 페이지네이션
    let pagedUsers = users;
    let hasNextPage: boolean | null = null;
    if (page && !limit) limit = "10";
    if (page && limit) {
      const offset = (parseInt(page) - 1) * parseInt(limit);
      pagedUsers = users.slice(offset, offset + parseInt(limit));
      hasNextPage = offset + parseInt(limit) < users.length;
    } else if (!page && limit) {
      pagedUsers = users.slice(0, parseInt(limit));
    }

    const response: {
      message: string;
      users: User[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "유저 목록 조회 성공",
      users: pagedUsers
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

  try {
    const db = await dbPromise;
    const users = db.data.users;
    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
    const newUser: User = {
      id: maxId + 1,
      username,
      phone,
      address,
      email,
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 19)
    };

    return NextResponse.json(
      {
        message: "유저 생성 성공",
        user: newUser
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "유저 생성 실패" }, { status: 500 });
  }
}
