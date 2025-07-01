import { renderHook, act } from "@testing-library/react";
import useLoremOptions from "@/src/hooks/lorem/useLoremOptions";

describe("useLoremOptions hook test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("반환 값이 올바르게 반환된다", () => {
    const { result } = renderHook(() => useLoremOptions());
    expect(result.current.mode).toBe("paragraph");
    expect(result.current.count).toBe(2);
    expect(result.current.lengthValue).toBe(200);
    expect(result.current.countLabel).toBe("문단 개수");
    expect(result.current.countMax).toBe(20);
    expect(result.current.countMin).toBe(1);
    expect(result.current.lengthLabel).toBe("문단 글자수");
    expect(result.current.lengthMin).toBe(30);
    expect(result.current.lengthMax).toBe(500);
    expect(result.current.modeBadge).toBe("문단 2개, 200글자");
    expect(typeof result.current.setMode).toBe("function");
    expect(typeof result.current.setCount).toBe("function");
    expect(typeof result.current.setLengthValue).toBe("function");
    expect(typeof result.current.clip).toBe("function");
    expect(typeof result.current.resetByMode).toBe("function");
    expect(typeof result.current.handleCountChange).toBe("function");
    expect(typeof result.current.handleCountBlur).toBe("function");
    expect(typeof result.current.handleLengthChange).toBe("function");
    expect(typeof result.current.handleLengthBlur).toBe("function");
  });

  it("resetByMode로 모드 변경 시 값이 초기화된다", () => {
    const { result } = renderHook(() => useLoremOptions());
    act(() => {
      result.current.resetByMode("sentence");
    });
    expect(result.current.mode).toBe("sentence");
    expect(result.current.count).toBe(5);
    expect(result.current.lengthValue).toBe(30);

    act(() => {
      result.current.resetByMode("word");
    });
    expect(result.current.mode).toBe("word");
    expect(result.current.count).toBe(5);
    expect(result.current.lengthValue).toBe(3);
  });

  it("clip 함수가 정상 동작한다", () => {
    const { result } = renderHook(() => useLoremOptions());
    expect(result.current.clip(5, 1, 10)).toBe(5);
    expect(result.current.clip(0, 1, 10)).toBe(1);
    expect(result.current.clip(20, 1, 10)).toBe(10);
  });

  it("modeBadge가 올바른 문자열을 반환한다", () => {
    const { result } = renderHook(() => useLoremOptions());
    expect(result.current.modeBadge).toMatch(/문단 2개, 200글자/);

    act(() => {
      result.current.resetByMode("sentence");
    });
    expect(result.current.modeBadge).toMatch(/문장 5개, 30글자/);
  });

  it("handleCountChange와 handleCountBlur가 정상 동작한다", () => {
    const { result } = renderHook(() => useLoremOptions());
    act(() => {
      result.current.handleCountChange({
        target: { value: "10" }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.count).toBe("10");
    act(() => {
      result.current.handleCountBlur({
        target: { value: "1000" }
      } as React.FocusEvent<HTMLInputElement>);
    });
    expect(result.current.count).toBe(result.current.countMax);
  });

  it("handleLengthChange와 handleLengthBlur가 정상 동작한다", () => {
    const { result } = renderHook(() => useLoremOptions());
    act(() => {
      result.current.handleLengthChange({
        target: { value: "50" }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.lengthValue).toBe("50");
    act(() => {
      result.current.handleLengthBlur({
        target: { value: "1000" }
      } as React.FocusEvent<HTMLInputElement>);
    });
    expect(result.current.lengthValue).toBe(result.current.lengthMax);
  });
});
