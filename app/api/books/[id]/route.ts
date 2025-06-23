import executeQuery from "@/src/db/db";
import { Book } from "@/src/types/book-type";

import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: Promise<{
    id: string;
  }>;
}

// /api/books/:id
export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "id를 입력해주세요." },
        { status: 400 }
      );
    }

    const sql = "SELECT * FROM books where id = ?";
    const books = (await executeQuery(sql, [id])) as Book[];

    if (books.length === 0) {
      return NextResponse.json(
        { message: "책이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "책 조회 성공", book: books[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "책 조회 실패" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
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
    // 데이터베이스에서 실제 데이터를 조회
    const books = (await executeQuery("SELECT * FROM books WHERE id = ?", [
      id
    ])) as Book[];

    if (books.length === 0) {
      return NextResponse.json(
        { message: "책이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = {
      id: books[0].id,
      author,
      genre,
      title,
      publicationDate: new Date(publicationDate).toISOString(),
      totalPage
    };

    return NextResponse.json(
      {
        message: "책 수정 성공",
        book: dummyData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
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

  if (!author && !genre && !publicationDate && !totalPage) {
    return NextResponse.json(
      { message: "수정할 데이터가 없습니다." },
      { status: 400 }
    );
  }

  try {
    // 데이터베이스에서 실제 데이터를 조회
    const books = (await executeQuery("SELECT * FROM books WHERE id = ?", [
      id
    ])) as Book[];

    if (books.length === 0) {
      return NextResponse.json(
        { message: "책이 존재하지 않습니다. id 값을 확인해주세요." },
        { status: 404 }
      );
    }

    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = {
      ...books[0],
      ...(author !== undefined && { author }),
      ...(genre !== undefined && { genre }),
      ...(title !== undefined && { title }),
      ...(publicationDate !== undefined && {
        publicationDate: new Date(publicationDate).toISOString()
      }),
      ...(totalPage !== undefined && { totalPage })
    };

    return NextResponse.json(
      {
        message: "책 수정 성공",
        book: dummyData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "id를 입력해주세요." },
      { status: 400 }
    );
  }

  const books = (await executeQuery("SELECT * FROM books WHERE id = ?", [
    id
  ])) as Book[];

  if (books.length === 0) {
    return NextResponse.json(
      { message: "책이 존재하지 않습니다. id 값을 확인해주세요." },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { message: `${id}번 책 삭제 성공` },
    { status: 200 }
  );
}
