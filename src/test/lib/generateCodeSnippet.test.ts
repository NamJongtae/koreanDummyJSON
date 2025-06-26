import { generateCodeSnippet } from "../../lib/generateCodeSnippet";

describe("generateCodeSnippet", () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, NEXT_PUBLIC_BASE_URL: "https://test.com" };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("기본 GET 요청 코드 생성", () => {
    const code = generateCodeSnippet({ fetchUrl: "/books", method: "GET" });
    expect(code).toContain('fetch("https://test.com/api/books"');
    expect(code).not.toContain("method:");
    expect(code).not.toContain("body:");
    expect(code).not.toContain("headers:");
    expect(code).toContain("response.json()");
  });

  it("POST 요청 + body 코드 생성", () => {
    const code = generateCodeSnippet({
      fetchUrl: "/login",
      method: "POST",
      body: { id: "a", pw: "b" }
    });
    expect(code).toContain('method: "POST"');
    expect(code).toContain(
      'body: JSON.stringify({\n    "id": "a",\n    "pw": "b"\n})'
    );
    expect(code).toContain('"Content-Type": "application/json"');
    expect(code).toContain("response.json()");
  });

  it("PUT 요청 + body + headers 코드 생성", () => {
    const code = generateCodeSnippet({
      fetchUrl: "/user/1",
      method: "PUT",
      body: { name: "홍길동" },
      headers: { Authorization: "Bearer token" }
    });
    expect(code).toContain('method: "PUT"');
    expect(code).toContain('body: JSON.stringify({\n    "name": "홍길동"\n})');
    expect(code).toContain('"Content-Type": "application/json"');
    expect(code).toContain('"Authorization": "Bearer token"');
  });

  it("DELETE 요청 + custom headers 코드 생성", () => {
    const code = generateCodeSnippet({
      fetchUrl: "/user/1",
      method: "DELETE",
      headers: { "X-Test": "yes" }
    });
    expect(code).toContain('method: "DELETE"');
    expect(code).toContain('"X-Test": "yes"');
    expect(code).toContain('"Content-Type": "application/json"');
  });

  it("isBlob 옵션이 true일 때 blob 처리 코드 생성", () => {
    const code = generateCodeSnippet({
      fetchUrl: "/img",
      method: "GET",
      isBlob: true
    });
    expect(code).toContain("response.blob()");
    expect(code).toContain("blob => console.log(blob)");
    expect(code).toContain("Error fetching blob");
  });
});
