import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/src/db/sqlite";
import { Book } from "@/src/types/book-type";
import { Database as SqliteDatabase } from "sqlite";

export async function GET(req: NextRequest) {
  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const books = (await db.all("SELECT * FROM books")) as Book[];

    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    let limit = searchParams.get("limit");

    let result = books;
    let offset: number | null = null;
    let hasNextPage: boolean | null = null;

    if (page && !limit) {
      limit = "10";
    }

    if (page && limit) {
      offset = (parseInt(page) - 1) * parseInt(limit);
      result = books.slice(offset, offset + parseInt(limit));
      const totalBooks = books.length;
      hasNextPage =
        offset !== null && offset + parseInt(limit || "0") < totalBooks;
    } else if (!page && limit) {
      result = books.slice(0, parseInt(limit));
    }

    const response: {
      message: string;
      books: Book[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "책 목록 조회 성공",
      books: result
    };

    if (page) response.page = parseInt(page);
    if (limit) response.limit = parseInt(limit);
    if (hasNextPage !== null) response.hasNextPage = hasNextPage;

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "책 목록 조회 실패" }, { status: 500 });
  } finally {
    if (db) await db.close();
  }
}

export async function POST(req: NextRequest) {
  const { author, genre, title, publicationDate, totalPage } = await req
    .json()
    .catch(() => ({}));

  const errors: string[] = [];
  if (!author) errors.push("author");
  if (!genre) errors.push("genre");
  if (!title) errors.push("title");
  if (!publicationDate) errors.push("publicationDate");
  if (!totalPage) errors.push("totalPage");

  if (errors.length > 0) {
    return NextResponse.json(
      { message: errors.join(", ") + "을(를) 입력해주세요." },
      { status: 400 }
    );
  }

  const newBook: Book = {
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
      book: newBook
    },
    { status: 201 }
  );
}
