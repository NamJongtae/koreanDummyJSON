import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:3000/api/books";

test.describe("API /api/books", () => {
  test("GET /api/books - 책 목록 조회", async ({ request }) => {
    const res = await request.get(API_URL);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.books)).toBe(true);
    expect(data.message).toBe("책 목록 조회 성공");
  });

  test("POST /api/books - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: { title: "책3" }
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("author, genre, publicationDate, totalPage을(를) 입력해주세요.");
  });

  test("POST /api/books - 정상 입력 시 201", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: {
        author: "작가3",
        genre: "추리",
        title: "책3",
        publicationDate: "2022-01-01",
        totalPage: 300
      }
    });
    expect(res.status()).toBe(201);
    const data = await res.json();
    expect(data.book).toMatchObject({
      title: "책3",
      author: "작가3",
      genre: "추리",
      publicationDate: "2022-01-01",
      totalPage: 300
    });
    expect(data.message).toBe("책 생성 성공");
  });
});

test.describe("API /api/books/[id]", () => {
  test("GET /api/books/1 - 책 단건 조회 성공", async ({ request }) => {
    const res = await request.get(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.book).toBeDefined();
    expect(data.message).toBe("책 조회 성공");
  });

  test("GET /api/books/9999 - 없는 책 조회 시 404", async ({ request }) => {
    const res = await request.get(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe("책이 존재하지 않습니다. id 값을 확인해주세요.");
  });

  test("PUT /api/books/1 - 책 전체 수정 성공", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, {
      data: {
        author: "수정작가",
        genre: "수정장르",
        title: "수정제목",
        publicationDate: "2024-01-01",
        totalPage: 123
      }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.book).toMatchObject({
      author: "수정작가",
      genre: "수정장르",
      title: "수정제목",
      publicationDate: "2024-01-01",
      totalPage: 123
    });
    expect(data.message).toBe("책 수정 성공");
  });

  test("PUT /api/books/1 - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, {
      data: { title: "누락" }
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("author, genre, publicationDate, totalPage을(를) 입력해주세요.");
  });

  test("PATCH /api/books/1 - 일부 필드 수정 성공", async ({ request }) => {
    const res = await request.patch(`${API_URL}/1`, {
      data: { title: "부분수정" }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.book).toMatchObject({
      title: "부분수정"
    });
    expect(data.message).toBe("책 수정 성공");
  });

  test("PATCH /api/books/1 - 수정할 데이터 없을 때 400", async ({
    request
  }) => {
    const res = await request.patch(`${API_URL}/1`, { data: {} });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("수정할 데이터가 없습니다.");
  });

  test("DELETE /api/books/1 - 책 삭제 성공", async ({ request }) => {
    const res = await request.delete(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.message).toBe("1번 책 삭제 성공");
  });

  test("DELETE /api/books/9999 - 없는 책 삭제 시 404", async ({ request }) => {
    const res = await request.delete(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe("책이 존재하지 않습니다. id 값을 확인해주세요.");
  });
});

test.describe("API /api/books/[id]/reviews", () => {
  test("GET /api/books/1/reviews - 책 리뷰 목록 정상 조회", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}/1/reviews`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.reviews)).toBe(true);
    expect(data.message).toBe("책 리뷰 목록 조회 성공");
  });

  test("GET /api/books/9999/reviews - 존재하지 않는 책 id", async ({ request }) => {
    const res = await request.get(`${API_URL}/9999/reviews`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe("책이 존재하지 않습니다. id 값을 확인해주세요.");
  });
});
