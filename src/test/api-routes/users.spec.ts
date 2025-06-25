import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:3000/api/users";

test.describe("API /api/users", () => {
  test("GET /api/users - 유저 목록 정상 조회", async ({ request }) => {
    const res = await request.get(API_URL);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.users)).toBe(true);
    expect(data.message).toBe("유저 목록 조회 성공");
  });

  test("GET /api/users?page=1&limit=2 - 페이지네이션 동작", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}?page=1&limit=2`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.users)).toBe(true);
    expect(data.page).toBe(1);
    expect(data.limit).toBe(2);
    expect(data.hasNextPage).toBe(true);
  });

  test("POST /api/users - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: { username: "홍길동" }
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("phone, address, email을(를) 입력해주세요.");
  });

  test("POST /api/users - 정상 입력 시 201", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: {
        username: "테스트유저",
        phone: "010-1234-5678",
        address: "서울시 테스트구",
        email: "testuser@example.com"
      }
    });
    expect(res.status()).toBe(201);
    const data = await res.json();
    expect(data.user).toMatchObject({
      username: "테스트유저",
      phone: "010-1234-5678",
      address: "서울시 테스트구",
      email: "testuser@example.com"
    });
    expect(data.message).toBe("유저 생성 성공");
  });
});

test.describe("API /api/users/[id]", () => {
  test("GET /api/users/1 - 유저 단건 조회 성공", async ({ request }) => {
    const res = await request.get(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.user).toBeDefined();
    expect(data.message).toBe("유저 조회 성공");
  });

  test("GET /api/users/9999 - 없는 유저 조회 시 404", async ({ request }) => {
    const res = await request.get(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe(
      "유저가 존재하지 않습니다. id 값을 확인해주세요."
    );
  });

  test("PUT /api/users/1 - 유저 전체 수정 성공", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, {
      data: {
        username: "수정유저",
        email: "edituser@example.com",
        phone: "010-9999-8888",
        address: "수정주소"
      }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.user).toMatchObject({
      username: "수정유저",
      email: "edituser@example.com",
      phone: "010-9999-8888",
      address: "수정주소"
    });
    expect(data.message).toBe("유저 수정 성공");
  });

  test("PUT /api/users/1 - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, {
      data: {}
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("username, email, phone, address을(를) 입력해주세요.");
  });

  test("PATCH /api/users/1 - 일부 필드 수정 성공", async ({ request }) => {
    const res = await request.patch(`${API_URL}/1`, {
      data: { address: "부분수정" }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.user).toMatchObject({
      address: "부분수정"
    });
    expect(data.message).toBe("유저 수정 성공");
  });

  test("PATCH /api/users/1 - 수정할 데이터 없을 때 400", async ({
    request
  }) => {
    const res = await request.patch(`${API_URL}/1`, { data: {} });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("수정할 데이터가 없습니다.");
  });

  test("DELETE /api/users/1 - 유저 삭제 성공", async ({ request }) => {
    const res = await request.delete(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.message).toBe("1번 유저 삭제 성공");
  });

  test("DELETE /api/users/9999 - 없는 유저 삭제 시 404", async ({
    request
  }) => {
    const res = await request.delete(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe(
      "유저가 존재하지 않습니다. id 값을 확인해주세요."
    );
  });
});

test.describe("API /api/users/[id]/todos", () => {
  test("GET /api/users/1/todos - 유저 할 일 목록 정상 조회", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}/1/todos`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.todos)).toBe(true);
    expect(data.message).toBe("유저 할 일 목록 조회 성공");
  });

  test("GET /api/users/9999/todos - 없는 유저의 할 일 목록(404)", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}/9999/todos`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe("유저가 존재하지 않습니다. id 값을 확인해주세요.");
  });
});

test.describe("API /api/users/[id]/posts", () => {
  test("GET /api/users/1/posts - 유저 게시물 목록 정상 조회", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}/1/posts`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.posts)).toBe(true);
    expect(data.message).toBe("유저 게시물 목록 조회 성공");
  });

  test("GET /api/users/9999/posts - 없는 유저의 게시물 목록(404)", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}/9999/posts`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe("유저가 존재하지 않습니다. id 값을 확인해주세요.");
  });
});

test.describe("API /api/users/[id]/comments", () => {
  test("GET /api/users/1/comments - 유저 댓글 목록 정상 조회", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}/1/comments`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.comments)).toBe(true);
    expect(data.message).toBe("유저 댓글 목록 조회 성공");
  });

  test("GET /api/users/9999/comments - 없는 유저의 댓글(404)", async ({ request }) => {
    const res = await request.get(`${API_URL}/9999/comments`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe("유저가 존재하지 않습니다. id 값을 확인해주세요.");
  });
});

test.describe("API /api/users/[id]/reviews", () => {
  test("GET /api/users/1/reviews - 유저 리뷰 목록 정상 조회", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}/1/reviews`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.reviews)).toBe(true);
    expect(data.message).toBe("유저 리뷰 목록 조회 성공");
  });

  test("GET /api/users/9999/reviews - 없는 유저의 리뷰 목록(404)", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}/9999/reviews`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe("유저가 존재하지 않습니다. id 값을 확인해주세요.");
  });
});
