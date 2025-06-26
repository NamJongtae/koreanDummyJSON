import { renderHook, act } from "@testing-library/react";
import useSectionNavigatorScroller from "../../../hooks/commons/useSectionNavigatorScroller";

describe("useSectionNavigatorScroller hook test", () => {
  let originalQuerySelectorAll: typeof document.querySelectorAll;
  let originalInnerHeight: number;
  let originalScrollY: number;
  let originalOffsetHeight: number;

  beforeEach(() => {
    originalQuerySelectorAll = document.querySelectorAll;
    originalInnerHeight = window.innerHeight;
    originalScrollY = window.scrollY;
    originalOffsetHeight = document.documentElement.offsetHeight;
  });

  afterEach(() => {
    document.querySelectorAll = originalQuerySelectorAll;
    window.innerHeight = originalInnerHeight;
    window.scrollY = originalScrollY;
    Object.defineProperty(document.documentElement, "offsetHeight", {
      value: originalOffsetHeight,
      configurable: true
    });
    jest.clearAllMocks();
  });

  it("초기 activeSectionId는 '소개'여야 한다", () => {
    const { result } = renderHook(() => useSectionNavigatorScroller());
    expect(result.current.activeSectionId).toBe("소개");
  });

  it("스크롤 시 섹션의 top이 0~70이면 activeSectionId가 해당 id로 바뀐다", () => {
    // section mock
    const sectionMock = {
      getBoundingClientRect: () => ({ top: 50 }),
      getAttribute: () => "테스트섹션"
    };
    document.querySelectorAll = jest.fn().mockReturnValue([sectionMock]);

    const { result } = renderHook(() => useSectionNavigatorScroller());

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.activeSectionId).toBe("테스트섹션");
  });

  it("스크롤이 맨 아래일 때 마지막 섹션이 activeSectionId가 된다", () => {
    const sectionMock1 = {
      getBoundingClientRect: () => ({ top: 100 }),
      getAttribute: () => "섹션1"
    };
    const sectionMock2 = {
      getBoundingClientRect: () => ({ top: 200 }),
      getAttribute: () => "섹션2"
    };
    document.querySelectorAll = jest
      .fn()
      .mockReturnValue([sectionMock1, sectionMock2]);
    window.innerHeight = 1000;
    window.scrollY = 2000;
    Object.defineProperty(document.documentElement, "offsetHeight", {
      value: 3000,
      configurable: true
    });

    const { result } = renderHook(() => useSectionNavigatorScroller());

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.activeSectionId).toBe("섹션2");
  });
});
