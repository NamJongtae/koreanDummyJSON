import { Post } from "@/src/types/post-type";
import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:3000/api/posts";

test.describe("API /api/posts", () => {
  test("GET /api/posts - 게시물 목록 정상 조회", async ({ request }) => {
    const res = await request.get(API_URL);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.posts)).toBe(true);
    expect(data.message).toBe("게시물 목록 조회 성공");
  });

  test("GET /api/posts?page=1&limit=2 - 페이지네이션 동작", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}?page=1&limit=2`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.posts)).toBe(true);
    expect(data.page).toBe(1);
    expect(data.limit).toBe(2);
    expect(data.hasNextPage).toBe(true);
  });

  test("GET /api/posts?userId=1 - userId 필터 동작", async ({ request }) => {
    const res = await request.get(`${API_URL}?userId=1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.posts)).toBe(true);
    expect(data.posts.every((post: Post) => post.userId === 1)).toBe(true);
    expect(data.message).toBe("게시물 목록 조회 성공");
  });

  test("POST /api/posts - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: { title: "테스트" }
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("content, imgUrl을(를) 입력해주세요.");
  });

  test("POST /api/posts - 정상 입력 시 201", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: {
        title: "테스트 게시물",
        content: "테스트 내용",
        imgUrl: "https://example.com/image.jpg"
      }
    });
    expect(res.status()).toBe(201);
    const data = await res.json();
    expect(data.post).toMatchObject({
      title: "테스트 게시물",
      content: "테스트 내용",
      imgUrl: "https://example.com/image.jpg"
    });
    expect(data.message).toBe("게시물 생성 성공");
  });
});

test.describe("API /api/posts/[id]", () => {
  test("GET /api/posts/1 - 게시물 단건 조회 성공", async ({ request }) => {
    const res = await request.get(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.post).toBeDefined();
    expect(data.message).toBe("게시물 조회 성공");
  });

  test("GET /api/posts/9999 - 없는 게시물 조회 시 404", async ({ request }) => {
    const res = await request.get(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe(
      "게시물이 존재하지 않습니다. id 값을 확인해주세요."
    );
  });

  test("PUT /api/posts/1 - 게시물 전체 수정 성공", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, {
      data: {
        title: "수정된 제목",
        content: "수정된 내용",
        imgUrl: "https://example.com/edited.jpg"
      }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.post).toMatchObject({
      title: "수정된 제목",
      content: "수정된 내용",
      imgUrl: "https://example.com/edited.jpg"
    });
    expect(data.message).toBe("게시물 수정 성공");
  });

  test("PUT /api/posts/1 - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, {
      data: { title: "누락" }
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("content, imgUrl을(를) 입력해주세요.");
  });

  test("PATCH /api/posts/1 - 일부 필드 수정 성공", async ({ request }) => {
    const res = await request.patch(`${API_URL}/1`, {
      data: { content: "부분수정" }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.post).toMatchObject({
      content: "부분수정"
    });
    expect(data.message).toBe("게시물 수정 성공");
  });

  test("PATCH /api/posts/1 - 수정할 데이터 없을 때 400", async ({
    request
  }) => {
    const res = await request.patch(`${API_URL}/1`, { data: {} });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("수정할 데이터가 없습니다.");
  });

  test("DELETE /api/posts/1 - 게시물 삭제 성공", async ({ request }) => {
    const res = await request.delete(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.message).toBe("1번 게시물 삭제 성공");
  });

  test("DELETE /api/posts/9999 - 없는 게시물 삭제 시 404", async ({
    request
  }) => {
    const res = await request.delete(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe(
      "게시물이 존재하지 않습니다. id 값을 확인해주세요."
    );
  });
});

test.describe("API /api/posts/[id]/comments", () => {
  test("GET /api/posts/1/comments - 게시물 댓글 목록 정상 조회", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}/1/comments`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.comments)).toBe(true);
    expect(data.message).toBe("게시물 댓글 목록 조회 성공");
  });

  test("GET /api/posts/9999/comments - 없는 게시물(404)", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}/9999/comments`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe(
      "게시물이 존재하지 않습니다. id 값을 확인해주세요."
    );
  });
});
