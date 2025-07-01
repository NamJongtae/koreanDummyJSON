import { renderHook, act } from "@testing-library/react";
import useResetLorem from "@/src/hooks/lorem/useResetLorem";

describe("useResetLorem hook test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const resetByMode = jest.fn();
  const setResult = jest.fn();

  it("handleReset 함수가 올바르게 반환된다.", () => {
    const { result } = renderHook(() =>
      useResetLorem({
        mode: "paragraph",
        resetByMode,
        setResult
      })
    );
    expect(result.current).toHaveProperty("handleReset");
    expect(typeof result.current.handleReset).toBe("function");
  });

  it("handleReset 호출 시 resetByMode와 setResult를 올바르게 호출한다", () => {
    const { result } = renderHook(() =>
      useResetLorem({
        mode: "paragraph",
        resetByMode,
        setResult
      })
    );
    act(() => {
      result.current.handleReset();
    });
    expect(resetByMode).toHaveBeenCalledWith("paragraph");
    expect(setResult).toHaveBeenCalledWith("");
  });
});
