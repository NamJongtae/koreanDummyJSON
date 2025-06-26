import { renderHook, act } from "@testing-library/react";
import useNavDocsMenu from "../../../hooks/layout-nav/useNavDocsMenu";
import useDropdownMenu from "@/src/hooks/commons/useDropDownMenu";
import { useRouter } from "next/navigation";
import useKeyboardFocusMenu from "@/src/hooks/commons/useKeyboardFocusMenu";

jest.mock("../../../hooks/commons/useDropDownMenu");
jest.mock("next/navigation");
jest.mock("../../../hooks/commons/useKeyboardFocusMenu");

describe("useNavDocsMenu hook test", () => {
  const mockUseDropdownMenu = useDropdownMenu as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseKeyboardFocusMenu = useKeyboardFocusMenu as jest.Mock;
  const mockToggleMenu = jest.fn();
  const mockCloseMenu = jest.fn();
  const mockPush = jest.fn();
  const mockSetMenuListRef = jest.fn();
  const mockHandlMenuFocusOnTab = jest.fn();
  const mockHandleKeyDownEsc = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDropdownMenu.mockReturnValue({
      isOpenMenu: false,
      toggleMenu: mockToggleMenu,
      closeMenu: mockCloseMenu,
      menuRef: { current: null }
    });
    mockUseRouter.mockReturnValue({
      push: mockPush
    });
    mockUseKeyboardFocusMenu.mockReturnValue({
      setMenuListRef: mockSetMenuListRef,
      handlMenuFocusOnTab: mockHandlMenuFocusOnTab,
      handleKeyDownEsc: mockHandleKeyDownEsc
    });
  });

  it("초기값이 올바르게 반환된다", () => {
    const { result } = renderHook(() => useNavDocsMenu());
    expect(result.current.isOpenDocsMenu).toBe(false);
    expect(result.current.docsMenuRef).toEqual({ current: null });
    expect(typeof result.current.toggleDocsMenu).toBe("function");
    expect(typeof result.current.closeDocsMenu).toBe("function");
    expect(typeof result.current.handleClickDocMenu).toBe("function");
    expect(typeof result.current.setDocsMenuListRef).toBe("function");
    expect(typeof result.current.handleKeyDownEsc).toBe("function");
    expect(typeof result.current.handleKeyDownTabDocsMenu).toBe("function");
  });

  it("toggleDocsMenu, closeDocsMenu가 정상적으로 호출된다", () => {
    const { result } = renderHook(() => useNavDocsMenu());
    act(() => {
      result.current.toggleDocsMenu();
      result.current.closeDocsMenu();
    });
    expect(mockToggleMenu).toHaveBeenCalled();
    expect(mockCloseMenu).toHaveBeenCalled();
  });

  it("handleClickDocMenu 호출 시 router.push와 closeDocsMenu를 호출한다", () => {
    const { result } = renderHook(() => useNavDocsMenu());
    act(() => {
      result.current.handleClickDocMenu("Guide");
    });
    expect(mockPush).toHaveBeenCalledWith("/docs/guide");
    expect(mockCloseMenu).toHaveBeenCalled();
  });

  it("키보드 focus 관련 함수가 정상적으로 반환된다", () => {
    const { result } = renderHook(() => useNavDocsMenu());
    expect(result.current.setDocsMenuListRef).toBe(mockSetMenuListRef);
    expect(result.current.handleKeyDownEsc).toBe(mockHandleKeyDownEsc);
    expect(result.current.handleKeyDownTabDocsMenu).toBe(
      mockHandlMenuFocusOnTab
    );
  });
});
