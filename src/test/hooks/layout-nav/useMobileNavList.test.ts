import { renderHook, act } from "@testing-library/react";
import useMobileNavList from "../../../hooks/layout-nav/useMobileNavList";
import { optimizationTabFocus } from "@/src/lib/optimizationKeyboard";
import useDropdownMenu from "@/src/hooks/commons/useDropDownMenu";
import { DOCS_MENU } from "@/src/constants/constants";

jest.mock("@/src/components/commons/layout/nav-docs-menu");
jest.mock("@/src/lib/optimizationKeyboard");
jest.mock("../../../hooks/commons/useDropDownMenu");

describe("useMobileNavList hook test", () => {
  const mockOptimizationTabFocus = optimizationTabFocus as jest.Mock;
  const mockUseDropdownMenu = useDropdownMenu as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOptimizationTabFocus.mockReturnValue(jest.fn());
    mockUseDropdownMenu.mockReturnValue({
      isOpenMenu: false,
      closeMenu: jest.fn(),
      openMenu: jest.fn(),
      toggleMenu: jest.fn(),
      setMenuListRef: jest.fn(),
      handlMenuFocusOnTab: jest.fn(),
      handleKeyDownEsc: jest.fn()
    });
  });

  it("초기값이 올바르게 반환된다", () => {
    const { result } = renderHook(() => useMobileNavList());
    expect(result.current.isOpenDocsMenu).toBe(false);
    expect(result.current.DOCS_MENU).toEqual(DOCS_MENU);
  });

  it("toggleDocsMenu를 호출하면 isOpenDocsMenu가 토글된다", () => {
    const { result } = renderHook(() => useMobileNavList());
    act(() => {
      result.current.toggleDocsMenu();
    });
    expect(result.current.isOpenDocsMenu).toBe(true);
    act(() => {
      result.current.toggleDocsMenu();
    });
    expect(result.current.isOpenDocsMenu).toBe(false);
  });

  it("handleHomeLinkFocusOnTab 호출 시 optimizationTabFocus가 호출된다", () => {
    const { result } = renderHook(() => useMobileNavList());
    const fakeEvent = {
      preventDefault: jest.fn()
    } as unknown as React.KeyboardEvent<HTMLAnchorElement>;
    act(() => {
      result.current.handleHomeLinkFocusOnTab(fakeEvent);
    });
    expect(optimizationTabFocus).toHaveBeenCalled();
  });

  it("handleDocsBtnFocusOnTab 호출 시 optimizationTabFocus가 호출된다", () => {
    const { result } = renderHook(() => useMobileNavList());
    const fakeEvent = {
      preventDefault: jest.fn()
    } as unknown as React.KeyboardEvent<HTMLButtonElement>;
    act(() => {
      result.current.handleDocsBtnFocusOnTab(fakeEvent);
    });
    expect(optimizationTabFocus).toHaveBeenCalled();
  });

  it("isOpenDocsMenu에 따라 arcodianRef 스타일/클래스가 변경된다", () => {
    const { result } = renderHook(() => useMobileNavList());
    const fakeUl = document.createElement("ul");
    Object.defineProperty(fakeUl, "scrollHeight", { value: 100 });
    (
      result.current
        .arcodianRef as React.MutableRefObject<HTMLUListElement | null>
    ).current = fakeUl;
    // 메뉴 열기
    act(() => {
      result.current.toggleDocsMenu();
    });
    expect(fakeUl.style.maxHeight).toBe("110px");
    expect(fakeUl.classList.contains("border-t")).toBe(true);
    expect(fakeUl.classList.contains("border-b")).toBe(true);
    // 메뉴 닫기
    act(() => {
      result.current.toggleDocsMenu();
    });
    expect(fakeUl.style.maxHeight).toBe("0");
    expect(fakeUl.classList.contains("border-t")).toBe(false);
    expect(fakeUl.classList.contains("border-b")).toBe(false);
  });
});
