import { renderHook } from "@testing-library/react";
import useKeyboardFocusMenu from "../../../hooks/commons/useKeyboardFocusMenu";
import {
  optimizationTabFocus,
  escKeyClose
} from "@/src/lib/optimizationKeyboard";

jest.mock("@/src/lib/optimizationKeyboard");

describe("useKeyboardFocusMenu hook test", () => {
  const mockOptimizationTabFocus = jest.mocked(optimizationTabFocus);
  const mockEscKeyClose = jest.mocked(escKeyClose);
  const menuItems = ["A", "B", "C"];

  beforeEach(() => {
    jest.clearAllMocks();
    mockOptimizationTabFocus.mockImplementation(jest.fn());
    mockEscKeyClose.mockImplementation(jest.fn());
  });

  it("초기값이 올바르게 반환된다", () => {
    const { result } = renderHook(() => useKeyboardFocusMenu({ menuItems }));
    expect(result.current.firstMenuRef).toEqual({ current: null });
    expect(result.current.lastMenuPrevRef).toEqual({ current: null });
    expect(result.current.lastMenuRef).toEqual({ current: null });
    expect(typeof result.current.setMenuListRef).toBe("function");
    expect(typeof result.current.handlMenuFocusOnTab).toBe("function");
    expect(typeof result.current.handleKeyDownEsc).toBe("function");
  });

  it("setMenuListRef가 올바른 ref를 반환한다", () => {
    const { result } = renderHook(() => useKeyboardFocusMenu({ menuItems }));
    expect(result.current.setMenuListRef(0)).toBe(result.current.firstMenuRef);
    expect(result.current.setMenuListRef(1)).toBe(
      result.current.lastMenuPrevRef
    );
    expect(result.current.setMenuListRef(2)).toBe(result.current.lastMenuRef);
  });

  it("handlMenuFocusOnTab 호출 시 첫 인덱스(0)에서 optimizationTabFocus를 호출한다", () => {
    const { result } = renderHook(() => useKeyboardFocusMenu({ menuItems }));
    const fakeEvent = {
      preventDefault: jest.fn(),
      shiftKey: false,
      keyCode: 9
    } as unknown as React.KeyboardEvent<HTMLButtonElement>;
    result.current.handlMenuFocusOnTab(fakeEvent, 0);
    expect(mockOptimizationTabFocus).toHaveBeenCalled();
  });

  it("handlMenuFocusOnTab 호출 시 마지막 인덱스(menuItems.length - 1)에서 optimizationTabFocus를 호출한다", () => {
    const { result } = renderHook(() => useKeyboardFocusMenu({ menuItems }));
    const fakeEvent = {
      preventDefault: jest.fn(),
      shiftKey: false,
      keyCode: 9
    } as unknown as React.KeyboardEvent<HTMLButtonElement>;
    result.current.handlMenuFocusOnTab(fakeEvent, menuItems.length - 1);
    expect(mockOptimizationTabFocus).toHaveBeenCalled();
  });

  it("handleKeyDownEsc 호출 시 escKeyClose가 호출된다", () => {
    const { result } = renderHook(() => useKeyboardFocusMenu({ menuItems }));
    const fakeEvent = {
      keyCode: 27
    } as unknown as React.KeyboardEvent<HTMLButtonElement>;
    const closeMenu = jest.fn();
    result.current.handleKeyDownEsc(fakeEvent, closeMenu);
    expect(mockEscKeyClose).toHaveBeenCalledWith({
      event: fakeEvent,
      closeCb: closeMenu
    });
  });
});
