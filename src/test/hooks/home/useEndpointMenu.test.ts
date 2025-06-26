import { renderHook, act } from "@testing-library/react";
import useEndpointMenu from "../../../hooks/home/useEndpointMenu";
import { generateCodeSnippet } from "@/src/lib/generateCodeSnippet";
import useDropdownMenu from "@/src/hooks/commons/useDropDownMenu";

jest.mock("@/src/lib/generateCodeSnippet");
jest.mock("../../../hooks/commons/useDropDownMenu");

describe("useEndpointMenu hook test", () => {
  const mockGenerateCodeSnippet = jest.mocked(generateCodeSnippet);
  const mockUseDropdownMenu = jest.mocked(useDropdownMenu);

  beforeEach(() => {
    jest.clearAllMocks();
    mockGenerateCodeSnippet.mockImplementation(
      ({ fetchUrl }) => `CODE:${fetchUrl}`
    );
    mockUseDropdownMenu.mockImplementation(() => ({
      isOpenMenu: false,
      toggleMenu: jest.fn(),
      closeMenu: jest.fn(),
      openMenu: jest.fn(),
      menuRef: { current: null },
      timerRef: { current: null },
      firstMenuRef: { current: null },
      lastMenuPreviousRef: { current: null },
      lastMenuRef: { current: null }
    }));
  });

  it("초기값이 올바르게 설정된다", () => {
    const { result } = renderHook(() => useEndpointMenu());
    expect(result.current.ENDPOINTS).toContain("/users/1");
    expect(Array.isArray(result.current.ENDPOINTS)).toBe(true);
    expect(result.current.endpoint).toBe("Endpoint");
    expect(result.current.isOpenEndpointMenu).toBe(false);
    expect(result.current.endpointMenuRef).toEqual({ current: null });
    expect(result.current.code).toBe(
      "조회할 데이터의 Endpoint를 선택해주세요."
    );
    expect(typeof result.current.toggleEndpointMenu).toBe("function");
    expect(typeof result.current.selectEndpoint).toBe("function");
  });

  it("selectEndpoint 호출 시 endpoint가 변경되고 code가 생성된다", () => {
    const { result } = renderHook(() => useEndpointMenu());
    act(() => {
      result.current.selectEndpoint("/users/1");
    });
    expect(result.current.endpoint).toBe("/users/1");
    expect(result.current.code).toBe("CODE:/users/1");
  });

  it("같은 endpoint를 다시 선택하면 변경되지 않고 toggleEndpointMenu가 호출되지 않는다", () => {
    const { result } = renderHook(() => useEndpointMenu());
    // 먼저 한 번 선택
    act(() => {
      result.current.selectEndpoint("/users/1");
    });
    const prevEndpoint = result.current.endpoint;
    const toggleSpy = jest.spyOn(result.current, "toggleEndpointMenu");
    // 같은 값으로 다시 선택
    act(() => {
      result.current.selectEndpoint("/users/1");
    });
    expect(result.current.endpoint).toBe(prevEndpoint);
    expect(toggleSpy).not.toHaveBeenCalled();
  });
});
