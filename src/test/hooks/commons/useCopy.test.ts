import { renderHook, act } from "@testing-library/react";
import useCopy from "../../../hooks/commons/useCopy";

describe("useCopy hook test", () => {
  const originalClipboard = { ...global.navigator.clipboard };

  beforeEach(() => {
    Object.defineProperty(global.navigator, "clipboard", {
      value: {
        writeText: jest.fn().mockResolvedValue(undefined)
      },
      configurable: true
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    Object.defineProperty(global.navigator, "clipboard", {
      value: originalClipboard,
      configurable: true
    });
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("초기값이 올바르게 반환된다", () => {
    const { result } = renderHook(() => useCopy("test"));
    expect(result.current.isCopied).toBe(false);
    expect(typeof result.current.handleCopy).toBe("function");
  });

  it("handleCopy를 호출하면 isCopied가 true가 되고, 2초 후 false로 변경된다", async () => {
    const { result } = renderHook(() => useCopy("hello"));

    // 초기값은 false
    expect(result.current.isCopied).toBe(false);

    // 복사 실행
    await act(async () => {
      await result.current.handleCopy();
    });

    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
    expect(result.current.isCopied).toBe(true);

    // 2초 후 false로
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.isCopied).toBe(false);
  });

  it("isCopied가 true일 때 handleCopy를 다시 호출해도 writeText가 실행되지 않는다", async () => {
    const { result } = renderHook(() => useCopy("world"));

    // 첫 복사
    await act(async () => {
      await result.current.handleCopy();
    });
    expect(result.current.isCopied).toBe(true);

    // 두 번째 복사 시도
    await act(async () => {
      await result.current.handleCopy();
    });

    // writeText는 한 번만 호출되어야 함
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });
});
