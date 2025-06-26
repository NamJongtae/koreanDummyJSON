import { renderHook, act, waitFor } from "@testing-library/react";
import useDropdownMenu from "../../../hooks/commons/useDropDownMenu";

describe("useDropdownMenu hook test", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("초기값이 올바르게 반환된다", () => {
    const { result } = renderHook(() => useDropdownMenu());
    expect(result.current.isOpenMenu).toBe(false);
    expect(typeof result.current.toggleMenu).toBe("function");
    expect(typeof result.current.closeMenu).toBe("function");
    expect(typeof result.current.openMenu).toBe("function");
    expect(result.current.menuRef).toEqual({ current: null });
    expect(result.current.timerRef).toEqual({ current: null });
    expect(result.current.firstMenuRef).toEqual({ current: null });
    expect(result.current.lastMenuPreviousRef).toEqual({ current: null });
    expect(result.current.lastMenuRef).toEqual({ current: null });
  });

  it("openMenu를 호출하면 isOpenMenu가 true가 된다", () => {
    const { result } = renderHook(() => useDropdownMenu());
    act(() => {
      result.current.openMenu();
    });
    expect(result.current.isOpenMenu).toBe(true);
  });

  it("closeMenu를 호출하면 isOpenMenu가 false가 된다", () => {
    const { result } = renderHook(() => useDropdownMenu());
    act(() => {
      result.current.openMenu();
      result.current.closeMenu();
    });
    expect(result.current.isOpenMenu).toBe(false);
  });

  it("toggleMenu는 열고 닫기를 토글한다", async () => {
    const { result } = renderHook(() => useDropdownMenu());

    (
      result.current.menuRef as React.MutableRefObject<HTMLUListElement | null>
    ).current = document.createElement("ul");

    act(() => {
      result.current.toggleMenu();
    });
    expect(result.current.isOpenMenu).toBe(true);

    act(() => {
      result.current.toggleMenu();
    });
    act(() => {
      jest.advanceTimersByTime(180);
    });

    // 상태가 false가 될 때까지 기다림
    await waitFor(() => {
      expect(result.current.isOpenMenu).toBe(false);
    });
  });

  it("isOpenMenu가 true일 때, 메뉴 바깥 클릭 시 닫힌다", () => {
    const { result } = renderHook(() => useDropdownMenu());

    // 메뉴를 연다
    act(() => {
      result.current.openMenu();
    });
    expect(result.current.isOpenMenu).toBe(true);

    // menuRef의 current에 실제 DOM 요소를 직접 할당 (타입 단언 사용)
    (
      result.current.menuRef as React.MutableRefObject<HTMLUListElement | null>
    ).current = document.createElement("ul");
    jest
      .spyOn(result.current.menuRef.current!, "contains")
      .mockReturnValue(false);

    // 바깥 클릭 이벤트 발생
    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      jest.advanceTimersByTime(180);
    });

    expect(result.current.isOpenMenu).toBe(false);
  });
});
