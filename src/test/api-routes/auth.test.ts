import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:3000/api/auth/login";

test.describe("API /api/auth/login", () => {
  test("POST /api/auth/login - 정상 로그인", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: {
        id: "testuser",
        password: "testpass"
      }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.message).toBe("로그인 성공");
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();
  });

  test("POST /api/auth/login - id 누락 시 400", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: {
        password: "testpass"
      }
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("id를 입력해주세요.");
  });

  test("POST /api/auth/login - password 누락 시 422", async ({ request }) => {
    const res = await request.post(API_URL, {
      data: {
        id: "testuser"
      }
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.message).toBe("password를 입력해주세요.");
  });
});

test.describe("API /api/auth/refresh", () => {
  test("GET /api/auth/refresh - 정상 토큰 재발급", async ({ request }) => {
    // 먼저 로그인해서 refreshToken을 얻는다
    const loginRes = await request.post(
      "http://localhost:3000/api/auth/login",
      {
        data: { id: "testuser", password: "testpass" }
      }
    );
    const loginData = await loginRes.json();
    const refreshToken = loginData.refreshToken;
    expect(refreshToken).toBeDefined();

    const res = await request.get("http://localhost:3000/api/auth/refresh", {
      headers: { Authorization: `Bearer ${refreshToken}` }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.message).toBe("accessToken 재발급 성공");
    expect(data.accessToken).toBeDefined();
  });

  test("GET /api/auth/refresh - 토큰 누락 시 401", async ({ request }) => {
    const res = await request.get("http://localhost:3000/api/auth/refresh");
    expect(res.status()).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("토큰이 존재하지 않습니다.");
  });

  test("GET /api/auth/refresh - 잘못된 토큰 시 401", async ({ request }) => {
    const res = await request.get("http://localhost:3000/api/auth/refresh", {
      headers: { Authorization: "Bearer invalidtoken" }
    });
    expect(res.status()).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("유효한 토큰이 아닙니다.");
  });
});

test.describe("API /api/auth/user", () => {
  test("GET /api/auth/user - 정상 토큰 인증", async ({ request }) => {
    // 먼저 로그인해서 accessToken을 얻는다
    const loginRes = await request.post(
      "http://localhost:3000/api/auth/login",
      {
        data: { id: "testuser", password: "testpass" }
      }
    );
    const loginData = await loginRes.json();
    const accessToken = loginData.accessToken;
    expect(accessToken).toBeDefined();

    const res = await request.get("http://localhost:3000/api/auth/user", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.message).toBe("토큰 인증 성공");
    expect(data.userId).toBeDefined();
  });

  test("GET /api/auth/user - 토큰 누락 시 401", async ({ request }) => {
    const res = await request.get("http://localhost:3000/api/auth/user");
    expect(res.status()).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("토큰이 존재하지 않습니다.");
  });

  test("GET /api/auth/user - 잘못된 토큰 시 401", async ({ request }) => {
    const res = await request.get("http://localhost:3000/api/auth/user", {
      headers: { Authorization: "Bearer invalidtoken" }
    });
    expect(res.status()).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("유효한 토큰이 아닙니다.");
  });
});
