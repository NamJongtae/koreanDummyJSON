import { Review } from '@/src/types/review-type';
import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:3000/api/reviews";

test.describe("API /api/reviews", () => {
  test("GET /api/reviews - 리뷰 목록 정상 조회", async ({ request }) => {
    const res = await request.get(API_URL);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.reviews)).toBe(true);
    expect(data.message).toBe("리뷰 목록 조회 성공");
  });

  test("GET /api/reviews?page=1&limit=2 - 페이지네이션 동작", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}?page=1&limit=2`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.reviews)).toBe(true);
    expect(data.page).toBe(1);
    expect(data.limit).toBe(2);
    expect(data.hasNextPage).toBe(true);
  });

  test("GET /api/reviews?userId=1 - userId 필터 동작", async ({ request }) => {
    const res = await request.get(`${API_URL}?userId=1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.reviews)).toBe(true);
    expect(data.reviews.every((r: Review) => r.userId === 1)).toBe(true);
    expect(data.message).toBe("리뷰 목록 조회 성공");
  });

  test("GET /api/reviews?bookId=1 - bookId 필터 동작", async ({ request }) => {
    const res = await request.get(`${API_URL}?bookId=1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.reviews)).toBe(true);
    expect(data.reviews.every((r: Review) => r.bookId === 1)).toBe(true);
    expect(data.message).toBe("리뷰 목록 조회 성공");
  });

  test("POST /api/reviews - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: { content: "테스트 리뷰" }
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("rating을(를) 입력해주세요.");
  });

  test("POST /api/reviews - 정상 입력 시 201", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: {
        rating: 5,
        content: "테스트 리뷰",
        userId: 1,
        bookId: 1
      }
    });
    expect(res.status()).toBe(201);
    const data = await res.json();
    expect(data.review).toMatchObject({
      rating: 5,
      content: "테스트 리뷰",
      userId: 1,
      bookId: 1
    });
    expect(data.message).toBe("리뷰 생성 성공");
  });
});

test.describe("API /api/reviews/[id]", () => {
  test("GET /api/reviews/1 - 리뷰 단건 조회 성공", async ({ request }) => {
    const res = await request.get(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.review).toBeDefined();
    expect(data.message).toBe("리뷰 조회 성공");
  });

  test("GET /api/reviews/9999 - 없는 리뷰 조회 시 404", async ({ request }) => {
    const res = await request.get(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe(
      "리뷰가 존재하지 않습니다. id 값을 확인해주세요."
    );
  });

  test("PUT /api/reviews/1 - 리뷰 전체 수정 성공", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, {
      data: {
        rating: 4,
        content: "수정된 리뷰"
      }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.review).toMatchObject({
      rating: 4,
      content: "수정된 리뷰"
    });
    expect(data.message).toBe("리뷰 수정 성공");
  });

  test("PUT /api/reviews/1 - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, {
      data: {}
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("rating, content을(를) 입력해주세요.");
  });

  test("PATCH /api/reviews/1 - 일부 필드 수정 성공", async ({ request }) => {
    const res = await request.patch(`${API_URL}/1`, {
      data: { content: "부분수정" }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.review).toMatchObject({
      content: "부분수정"
    });
    expect(data.message).toBe("리뷰 수정 성공");
  });

  test("PATCH /api/reviews/1 - 수정할 데이터 없을 때 400", async ({
    request
  }) => {
    const res = await request.patch(`${API_URL}/1`, { data: {} });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("수정할 데이터가 없습니다.");
  });

  test("DELETE /api/reviews/1 - 리뷰 삭제 성공", async ({ request }) => {
    const res = await request.delete(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.message).toBe("1번 리뷰 삭제 성공");
  });

  test("DELETE /api/reviews/9999 - 없는 리뷰 삭제 시 404", async ({
    request
  }) => {
    const res = await request.delete(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe(
      "리뷰가 존재하지 않습니다. id 값을 확인해주세요."
    );
  });
});
