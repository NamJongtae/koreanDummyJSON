import { Todo } from "@/src/types/todo-type";
import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:3000/api/todos";

test.describe("API /api/todos", () => {
  test("GET /api/todos - 할 일 목록 정상 조회", async ({ request }) => {
    const res = await request.get(API_URL);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.todos)).toBe(true);
    expect(data.message).toBe("할 일 목록 조회 성공");
  });

  test("GET /api/todos?page=1&limit=2 - 페이지네이션 동작", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}?page=1&limit=2`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.todos)).toBe(true);
    expect(data.page).toBe(1);
    expect(data.limit).toBe(2);
    expect(data.hasNextPage).toBe(true);
  });

  test("GET /api/todos?userId=1 - userId 필터 동작", async ({ request }) => {
    const res = await request.get(`${API_URL}?userId=1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.todos)).toBe(true);
    expect(data.todos.every((todo: Todo) => todo.userId === 1)).toBe(true);
    expect(data.message).toBe("할 일 목록 조회 성공");
  });

  test("POST /api/todos - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: { userId: 1 }
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("content를 입력해주세요.");
  });

  test("POST /api/todos - 정상 입력 시 201", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: {
        content: "테스트 할 일",
        userId: 1
      }
    });
    expect(res.status()).toBe(201);
    const data = await res.json();
    expect(data.todo).toMatchObject({
      content: "테스트 할 일",
      userId: 1
    });
    expect(data.message).toBe("할 일 생성 성공");
  });
});

test.describe("API /api/todos/[id]", () => {
  test("GET /api/todos/1 - 할 일 단건 조회 성공", async ({ request }) => {
    const res = await request.get(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.todo).toBeDefined();
    expect(data.message).toBe("할 일 조회 성공");
  });

  test("GET /api/todos/9999 - 없는 할 일 조회 시 404", async ({ request }) => {
    const res = await request.get(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe(
      "할 일이 존재하지 않습니다. id 값을 확인해주세요."
    );
  });

  test("PUT /api/todos/1 - 할 일 전체 수정 성공", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, {
      data: {
        content: "수정된 할 일",
        completed: true
      }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.todo).toMatchObject({
      content: "수정된 할 일",
      completed: true
    });
    expect(data.message).toBe("할 일 수정 성공");
  });

  test("PUT /api/todos/1 - 필수값 누락 시 400", async ({ request }) => {
    const res = await request.put(`${API_URL}/1`, {
      data: {}
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("content, completed을(를) 입력해주세요.");
  });

  test("PATCH /api/todos/1 - 일부 필드 수정 성공", async ({ request }) => {
    const res = await request.patch(`${API_URL}/1`, {
      data: { completed: false }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.todo).toMatchObject({
      completed: false
    });
    expect(data.message).toBe("할 일 수정 성공");
  });

  test("PATCH /api/todos/1 - 수정할 데이터 없을 때 400", async ({
    request
  }) => {
    const res = await request.patch(`${API_URL}/1`, { data: {} });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("수정할 데이터가 없습니다.");
  });

  test("DELETE /api/todos/1 - 할 일 삭제 성공", async ({ request }) => {
    const res = await request.delete(`${API_URL}/1`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.message).toBe("1번 할 일 삭제 성공");
  });

  test("DELETE /api/todos/9999 - 없는 할 일 삭제 시 404", async ({
    request
  }) => {
    const res = await request.delete(`${API_URL}/9999`);
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.message).toBe(
      "할 일이 존재하지 않습니다. id 값을 확인해주세요."
    );
  });
});
