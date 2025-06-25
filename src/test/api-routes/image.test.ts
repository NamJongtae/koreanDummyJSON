import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:3000/api/image";

test.describe("API /api/image", () => {
  test("GET /api/image - 기본 PNG 이미지 생성", async ({ request }) => {
    const res = await request.get(API_URL);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/png");
    const buffer = await res.body();
    expect(buffer.byteLength).toBeGreaterThan(0);
  });

  test("GET /api/image?ext=jpeg - JPEG 이미지 생성", async ({ request }) => {
    const res = await request.get(`${API_URL}?ext=jpeg`);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/jpeg");
    const buffer = await res.body();
    expect(buffer.byteLength).toBeGreaterThan(0);
  });

  test("GET /api/image?ext=svg - SVG 이미지 생성", async ({ request }) => {
    const res = await request.get(`${API_URL}?ext=svg`);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/svg+xml");
    const text = await res.text();
    expect(text).toContain("<svg");
  });

  test("GET /api/image?ext=webp - 미지원 확장자(400)", async ({ request }) => {
    const res = await request.get(`${API_URL}?ext=webp`);
    expect(res.status()).toBe(400);
    const text = await res.text();
    expect(text).toContain("Unsupported file format");
  });

  test("GET /api/image?size=300x200&bgColor=FF0000&text=Hello&textColor=00FF00&ext=png - 이미지 커스텀", async ({
    request
  }) => {
    const res = await request.get(
      `${API_URL}?size=300x200&bgColor=FF0000&text=Hello&textColor=00FF00&ext=png`
    );
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/png");
    const buffer = await res.body();
    expect(buffer.byteLength).toBeGreaterThan(0);
  });
});
