import { renderHook, act } from "@testing-library/react";
import useSectionNavigator from "../../../hooks/commons/useSectionNavigator";

// router mock을 외부에서 선언
const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

describe("useSectionNavigator hook test", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    pushMock.mockClear(); // mock 초기화
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("초기값이 올바르게 반환된다", () => {
    const { result } = renderHook(() => useSectionNavigator());
    expect(result.current.hovered).toBe(false);
    expect(result.current.navigatorRef).toEqual({ current: null });
    expect(typeof result.current.enterNavigator).toBe("function");
    expect(typeof result.current.leaveNavigator).toBe("function");
    expect(typeof result.current.handleClickSection).toBe("function");
  });

  it("enterNavigator를 호출하면 hovered가 true가 된다", () => {
    const { result } = renderHook(() => useSectionNavigator());
    act(() => {
      result.current.enterNavigator();
    });
    expect(result.current.hovered).toBe(true);
  });

  it("leaveNavigator를 호출하면 400ms 후 hovered가 false가 된다", () => {
    const { result } = renderHook(() => useSectionNavigator());
    // ref에 가짜 DOM 할당
    (
      result.current
        .navigatorRef as React.MutableRefObject<HTMLUListElement | null>
    ).current = document.createElement("ul");
    act(() => {
      result.current.enterNavigator();
      result.current.leaveNavigator();
    });
    // 애니메이션 클래스가 추가됐는지 확인
    expect(
      result.current.navigatorRef.current?.classList.contains(
        "animate-sectionNavSlideRight"
      )
    ).toBe(true);
    // 400ms 후 hovered가 false
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(result.current.hovered).toBe(false);
  });

  it("handleClickSection 호출 시 sectionId가 '소개'가 아닐 때 router.push가 호출된다", () => {
    const { result } = renderHook(() => useSectionNavigator());
    act(() => {
      result.current.handleClickSection("테스트섹션");
    });
    expect(pushMock).toHaveBeenCalledWith(
      "#%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%84%B9%EC%85%98"
    );
  });

  it("handleClickSection 호출 시 sectionId가 '소개'일 때 window.scrollTo가 호출된다", () => {
    const { result } = renderHook(() => useSectionNavigator());
    const scrollToMock = jest.fn();
    // scrollTo mock
    window.scrollTo = scrollToMock;
    act(() => {
      result.current.handleClickSection("소개");
    });
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
