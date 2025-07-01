import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:3000/api/lorem";

test.describe("GET /api/lorem", () => {
  test("기본값(paragraph, count=2, length=200) 응답 결과값 확인", async ({
    request
  }) => {
    const res = await request.get(API_URL);
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(typeof json.result).toBe("string");
    const paragraphs = json.result.split(/\n{2,}/).filter(Boolean);
    expect(paragraphs.length).toBe(2);
    for (const p of paragraphs) {
      expect(p.length).toBe(200);
    }
  });

  test("mode=paragraph, count=3, length=100) 응답 결과값 확인", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}?mode=p&count=3&length=100`);
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(typeof json.result).toBe("string");
    const paragraphs = json.result.split(/\n{2,}/).filter(Boolean);
    expect(paragraphs.length).toBe(3);
    for (const p of paragraphs) {
      expect(p.length).toBe(100);
    }
  });

  test("mode=sentence, (count=7, length=50) 응답 결과값 확인", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}?mode=s&count=7&length=50`);
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(typeof json.result).toBe("string");
    const sentences = json.result.match(/[^.!?]+[.!?]/g) || [];
    expect(sentences.length).toBe(7);
    for (const s of sentences) {
      expect(s.trim().length).toBe(50);
    }
  });

  test("mode=word, (count=10, length=5) 응답 결과값 확인", async ({
    request
  }) => {
    const res = await request.get(`${API_URL}?mode=w&count=10&length=5`);
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(typeof json.result).toBe("string");
    const words = json.result.trim().split(/\s+/);
    expect(words.length).toBe(10);
    for (const w of words) {
      expect(w.length).toBe(5);
    }
  });

  test("잘못된 mode/count/length가 들어오면 기본값이 적용된 응답 결과값 확인", async ({
    request
  }) => {
    const res = await request.get(
      `${API_URL}?mode=invalid&count=abc&length=xyz`
    );
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(typeof json.result).toBe("string");
    // 기본값: paragraph, count=2, length=200
    const paragraphs = json.result.split(/\n{2,}/).filter(Boolean);
    expect(paragraphs.length).toBe(2);
    for (const p of paragraphs) {
      expect(p.length).toBe(200);
    }
  });
});
