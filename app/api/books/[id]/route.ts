import { getDb } from "@/src/db/sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Book } from "@/src/types/book-type";
import { Database as SqliteDatabase } from "sqlite";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: IParams) {
  let db: SqliteDatabase | undefined;
  try {
    const { id } = await params;
    db = await getDb();
    const book = (await db.get("SELECT * FROM books WHERE id = ?", id)) as
      | Book
      | undefined;
    if (!book) {
      return NextResponse.json(
        { message: "책이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "책 조회 성공", book },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "책 조회 실패" }, { status: 500 });
  } finally {
    if (db) await db.close();
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  const { id } = await params;

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

  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const book = (await db.get("SELECT * FROM books WHERE id = ?", id)) as
      | Book
      | undefined;
    if (!book) {
      return NextResponse.json(
        { message: "책이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedBook: Book = {
      id: book.id,
      author,
      genre,
      title,
      publicationDate,
      totalPage
    };

    return NextResponse.json(
      {
        message: "책 수정 성공",
        book: updatedBook
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "책 수정 실패" }, { status: 500 });
  } finally {
    if (db) await db.close();
  }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
  const { id } = await params;

  const { author, genre, title, publicationDate, totalPage } = await req
    .json()
    .catch(() => ({}));

  if (
    author === undefined &&
    genre === undefined &&
    title === undefined &&
    publicationDate === undefined &&
    totalPage === undefined
  ) {
    return NextResponse.json(
      { message: "수정할 데이터가 없습니다." },
      { status: 400 }
    );
  }

  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const book = (await db.get("SELECT * FROM books WHERE id = ?", id)) as
      | Book
      | undefined;
    if (!book) {
      return NextResponse.json(
        { message: "책이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    const updatedBook: Book = {
      ...book,
      ...(author !== undefined && { author }),
      ...(genre !== undefined && { genre }),
      ...(title !== undefined && { title }),
      ...(publicationDate !== undefined && { publicationDate }),
      ...(totalPage !== undefined && { totalPage })
    };

    return NextResponse.json(
      {
        message: "책 수정 성공",
        book: updatedBook
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "책 수정 실패" }, { status: 500 });
  } finally {
    if (db) await db.close();
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  const { id } = await params;

  let db: SqliteDatabase | undefined;
  try {
    db = await getDb();
    const book = (await db.get("SELECT * FROM books WHERE id = ?", id)) as
      | Book
      | undefined;
    if (!book) {
      return NextResponse.json(
        { message: "책이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `${id}번 책 삭제 성공` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "책 삭제 실패" }, { status: 500 });
  } finally {
    if (db) await db.close();
  }
}
