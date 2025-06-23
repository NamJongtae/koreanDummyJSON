import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Book } from "@/src/types/book-type";

const dbFile = path.resolve(process.cwd(), "src/db/books.json");
const dbPromise = JSONFilePreset<{ books: Book[] }>(dbFile, { books: [] });

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "id를 입력해주세요." },
        { status: 400 }
      );
    }
    const db = await dbPromise;
    const book = db.data.books.find((b) => b.id === parseInt(id, 10));
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
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { message: "id를 입력해주세요." },
      { status: 400 }
    );
  }
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
      { messages: errors.join(", ") + "을(를) 입력해주세요." },
      { status: 400 }
    );
  }

  try {
    const db = await dbPromise;
    const idx = db.data.books.findIndex((b) => b.id === parseInt(id, 10));
    if (idx === -1) {
      return NextResponse.json(
        { message: "책이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }
    const updatedBook: Book = {
      id: db.data.books[idx].id,
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
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { message: "id를 입력해주세요." },
      { status: 400 }
    );
  }
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

  try {
    const db = await dbPromise;
    const idx = db.data.books.findIndex((b) => b.id === parseInt(id, 10));
    if (idx === -1) {
      return NextResponse.json(
        { message: "책이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }
    const oldBook = db.data.books[idx];
    const updatedBook: Book = {
      ...oldBook,
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
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { message: "id를 입력해주세요." },
      { status: 400 }
    );
  }
  try {
    const db = await dbPromise;
    const idx = db.data.books.findIndex((b) => b.id === parseInt(id, 10));
    if (idx === -1) {
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
  }
}
