import { renderHook, act } from "@testing-library/react";
import { useThrottle } from "../../../hooks/commons/useThrottle";

describe("useThrottle hook test", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("첫 호출 시 콜백이 실행되고, 이후 지정 시간 내에는 실행되지 않는다", () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useThrottle());
    const throttled = result.current(cb, 1000);

    act(() => {
      throttled("a");
      throttled("b");
      throttled("c");
    });

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith("a");
  });

  it("지정 시간 이후에는 다시 콜백이 실행된다", () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useThrottle());
    const throttled = result.current(cb, 1000);

    act(() => {
      throttled("a");
    });
    expect(cb).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(1000);
      throttled("b");
    });
    expect(cb).toHaveBeenCalledTimes(2);
    expect(cb).toHaveBeenLastCalledWith("b");
  });
});