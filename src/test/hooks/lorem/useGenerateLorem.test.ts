import { renderHook, act } from "@testing-library/react";
import useGenerateLorem from "@/src/hooks/lorem/useGenerateLorem";

describe("useGenerateLorem hook test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("result, setResult, handleGenerate가 제대로 반환된다", () => {
    const { result } = renderHook(() =>
      useGenerateLorem({ mode: "paragraph", count: 1, lengthValue: 10 })
    );
    expect(result.current).toHaveProperty("result");
    expect(result.current).toHaveProperty("setResult");
    expect(result.current).toHaveProperty("handleGenerate");
    expect(typeof result.current.result).toBe("string");
    expect(typeof result.current.setResult).toBe("function");
    expect(typeof result.current.handleGenerate).toBe("function");
  });

  it("paragraph 모드에서 설정한 문단 로렘이 생성된다", () => {
    const { result } = renderHook(() =>
      useGenerateLorem({ mode: "paragraph", count: 2, lengthValue: 100 })
    );
    act(() => {
      result.current.handleGenerate();
    });

    // 1. 문자열 타입인지
    expect(typeof result.current.result).toBe("string");

    // 2. 길이가 충분한지(2문단, 100자)
    expect(result.current.result.length).toBeGreaterThanOrEqual(200);

    // 3. 문단 구분(줄바꿈)이 있는지 (2개 문단이면 줄바꿈 1개 이상)
    expect(result.current.result.split("\n\n").length).toBeGreaterThanOrEqual(
      2
    );

    // 4. 결과가 완전히 비어있지 않은지
    expect(result.current.result.trim()).not.toBe("");
  });

  it("sentence 모드에서 설정한 문장 로렘 생성된다", () => {
    const { result } = renderHook(() =>
      useGenerateLorem({ mode: "sentence", count: 3, lengthValue: 30 })
    );
    act(() => {
      result.current.handleGenerate();
    });

    // 1. 문자열 타입인지
    expect(typeof result.current.result).toBe("string");

    // 2. 길이가 충분한지 (3문장, 30자)
    expect(result.current.result.length).toBeGreaterThanOrEqual(90);

    // 3. 문장 구분(마침표 등)이 있는지 (3개 문장 이상)
    const sentenceCount = result.current.result.split(".").length;
    expect(sentenceCount).toBeGreaterThanOrEqual(3);

    // 4. 결과가 완전히 비어있지 않은지
    expect(result.current.result.trim()).not.toBe("");
  });

  it("word 모드에서 설정한 단어 로렘 생성된다", () => {
    const { result } = renderHook(() =>
      useGenerateLorem({ mode: "word", count: 5, lengthValue: 2 })
    );
    act(() => {
      result.current.handleGenerate();
    });

    // 1. 문자열 타입인지
    expect(typeof result.current.result).toBe("string");

    // 2. 공백 제거 후 총 10글자인지(5단어, 2자)
    const noSpace = result.current.result.replace(/\s/g, "");
    expect(noSpace.length).toBe(10);

    // 3. 결과가 완전히 비어있지 않은지
    expect(result.current.result.trim()).not.toBe("");
  });

  it("count와 lengthValue가 string이어도 정상 동작한다", () => {
    const { result } = renderHook(() =>
      useGenerateLorem({ mode: "paragraph", count: "2", lengthValue: "10" })
    );
    act(() => {
      result.current.handleGenerate();
    });
    expect(result.current.result).not.toBe("");
  });
});
