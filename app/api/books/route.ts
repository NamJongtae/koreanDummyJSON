import executeQuery from "@/src/db/db";
import { Book } from "@/src/types/book-type";
import { NextRequest, NextResponse } from "next/server";

// /api/books
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const page = searchParams.get("page");
    let limit = searchParams.get("limit");

    let sql;
    let values: Array<number> = [];
    let offset: number | null = null;
    let hasNextPage: boolean | null = null;

    if (page && !limit) {
      // page만 있을 때 limit 기본값 10 적용
      limit = "10";
    }

    if (page && limit) {
      // 페이지네이션 계산
      offset = (parseInt(page) - 1) * parseInt(limit);

      // SQL 쿼리에 LIMIT과 OFFSET 적용
      // /api/books?page={page}&limit={limit} 책 목록 페이지
      sql = "SELECT * FROM books LIMIT ? OFFSET ?";
      values = [parseInt(limit), offset];

      // hasNextPage 계산
      const totalBooks = 100;
      hasNextPage =
        offset !== null && offset + parseInt(limit || "0") < totalBooks;
    } else if (!page && limit) {
      // limit만 있을 때 처음부터 limit개만 반환
      sql = "SELECT * FROM books LIMIT ?";
      values = [parseInt(limit)];
    } else {
      // page, limit 모두 없으면 전체 데이터를 조회
      // /api/posts 책 목록
      sql = "SELECT * FROM books";
    }

    // 데이터베이스 쿼리 실행
    const data = await executeQuery(sql, values);

    // 응답 객체 생성
    const response: {
      message: string;
      books: Book[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "책 목록 조회 성공",
      books: data as Book[]
    };

    // 조건에 따라 page, limit, hasNextPage 추가
    if (page) response.page = parseInt(page);
    if (limit) response.limit = parseInt(limit);
    if (hasNextPage !== null) response.hasNextPage = hasNextPage;

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "책 목록 조회 실패" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const {
    author = "",
    genre = "",
    title = "",
    publicationDate = "",
    totalPage = 0
  } = await req.json().catch(() => ({}));

  try {
    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = {
      id: 101,
      author,
      genre,
      title,
      publicationDate,
      totalPage
    };
    return NextResponse.json(
      {
        message: "책 생성 성공",
        book: dummyData
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
  }
}
