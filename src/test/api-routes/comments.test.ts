import { Comment } from '@/src/types/comment-type';
import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:3000/api/comments";

test.describe("API /api/comments", () => {
  test("GET /api/comments - 댓글 목록 정상 조회", async ({ request }) => {
    const res = await request.get(API_URL);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.comments)).toBe(true);
    expect(data.message).toBe("댓글 목록 조회 성공");
  });

  test("GET /api/comments?page=1&limit=2 - 페이지네이션 동작", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}?page=1&limit=2`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.comments)).toBe(true);
    expect(data.page).toBe(1);
    expect(data.limit).toBe(2);
    expect(data.hasNextPage).toBe(true);
  });

  test("GET /api/comments?userId=1 - userId 필터 동작", async ({ request }) => {
    const res = await request.get(`${API_URL}?userId=1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.comments)).toBe(true);
    expect(data.comments.every((c: Comment) => c.userId === 1)).toBe(true);
    expect(data.message).toBe("유저 댓글 목록 조회 성공");
  });

  test("GET /api/comments?postId=1 - postId 필터 동작", async ({ request }) => {
    const res = await request.get(`${API_URL}?postId=1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.comments)).toBe(true);
    expect(data.comments.every((c: Comment) => c.postId === 1)).toBe(true);
    expect(data.message).toBe("게시물 댓글 목록 조회 성공");
  });

  test("POST /api/comments - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: { userId: 1, postId: 1 }
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("content를 입력해주세요.");
  });

  test("POST /api/comments - 정상 입력 시 201", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: {
        content: "테스트 댓글",
        userId: 1,
        postId: 1
      }
    });
    expect(res.status()).toBe(201);
    const data = await res.json();
    expect(data.comment).toMatchObject({
      content: "테스트 댓글",
      userId: 1,
      postId: 1
    });
    expect(data.message).toBe("댓글 생성 성공");
  });
});

test.describe("API /api/comments/[id]", () => {
  test("GET /api/comments/1 - 댓글 단건 조회 성공", async ({ request }) => {
    const res = await request.get(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.comment).toBeDefined();
    expect(data.message).toBe("댓글 조회 성공");
  });

  test("GET /api/comments/9999 - 없는 댓글 조회 시 404", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe(
      "댓글이 존재하지 않습니다. id 값을 확인해주세요."
    );
  });

  test("PUT /api/comments/1 - 댓글 전체 수정 성공", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, {
      data: { content: "수정된 댓글" }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.comment).toMatchObject({
      content: "수정된 댓글"
    });
    expect(data.message).toBe("댓글 수정 성공");
  });

  test("PUT /api/comments/1 - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, { data: {} });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("content를 입력해주세요.");
  });

  test("PATCH /api/comments/1 - 일부 필드 수정 성공", async ({ request }) => {
    const res = await request.patch(`${API_URL}/1`, {
      data: { content: "부분수정" }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.comment).toMatchObject({
      content: "부분수정"
    });
    expect(data.message).toBe("댓글 수정 성공");
  });

  test("PATCH /api/comments/1 - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.patch(`${API_URL}/1`, { data: {} });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("content를 입력해주세요.");
  });

  test("DELETE /api/comments/1 - 댓글 삭제 성공", async ({ request }) => {
    const res = await request.delete(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.message).toBe("1번 댓글 삭제 성공");
  });

  test("DELETE /api/comments/9999 - 없는 댓글 삭제 시 404", async ({
    request
  }) => {
    const res = await request.delete(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe(
      "댓글이 존재하지 않습니다. id 값을 확인해주세요."
    );
  });
});
