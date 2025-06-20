import executeQuery from "@/src/db/db";
import { User } from "@/src/types/user-type";
import { NextRequest, NextResponse } from "next/server";

// /api/todos
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // page와 limit 값을 가져옵니다.
    const page = searchParams.get("page");
    const limit = searchParams.get("limit") || "10";

    // 기본값 설정
    let sql;
    let values: Array<number> = [];
    let offset: number | null = null;
    let hasNextPage: boolean | null = null;

    if (page && limit) {
      // 페이지네이션 계산
      offset = (parseInt(page) - 1) * parseInt(limit);
      sql = "SELECT * FROM users LIMIT ? OFFSET ?";
      values = [parseInt(limit), offset];
      // hasNextPage 계산
      const totalUsers = 20;
      hasNextPage = offset + parseInt(limit) < totalUsers;
    } else if (!page && limit) {
      // limit만 있을 때 처음부터 limit개만 반환
      sql = "SELECT * FROM users LIMIT ?";
      values = [parseInt(limit)];
    } else {
      // page, limit 모두 없으면 전체 데이터를 조회
      sql = "SELECT * FROM users";
    }

    // 데이터베이스 쿼리 실행
    const data = await executeQuery(sql, values);

    // 응답 객체 생성
    const response: {
      message: string;
      users: User[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "유저 목록 조회 성공",
      users: data as User[]
    };

    // 조건에 따라 page, limit, hasNextPage 추가
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
  const {
    username = "",
    phone = "",
    address = "",
    email = ""
  } = await req.json().catch(() => ({}));

  const dummyData = {
    id: 21,
    username,
    phone,
    address,
    email,
    createdAt: new Date()
  };

  return NextResponse.json(
    {
      message: "유저 생성 성공",
      user: dummyData
    },
    { status: 201 }
  );
}
