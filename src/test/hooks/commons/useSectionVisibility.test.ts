import { renderHook, act } from "@testing-library/react";
import { useSectionVisibility } from "../../../hooks/commons/useSectionVisibility";

describe("useSectionVisibility hook test", () => {
  let originalIntersectionObserver: typeof window.IntersectionObserver;
  let observeMock: jest.Mock;
  let disconnectMock: jest.Mock;

  beforeEach(() => {
    observeMock = jest.fn();
    disconnectMock = jest.fn();
    originalIntersectionObserver = window.IntersectionObserver;
    (window.IntersectionObserver as any) = jest.fn(function (cb, options) {
      this.observe = observeMock;
      this.disconnect = disconnectMock;
      this.trigger = (isIntersecting: boolean) => {
        cb([{ isIntersecting }]);
      };
    });
  });

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
    jest.clearAllMocks();
  });

  it("초기값이 올바르게 반환된다", () => {
    const { result } = renderHook(() => useSectionVisibility());
    expect(result.current.ref).toEqual({ current: null });
    expect(result.current.isVisible).toBe(false);
  });

  it("ref.current가 할당되고 IntersectionObserver가 트리거되면 isVisible이 true로 바뀐다", () => {
    const { result } = renderHook(() => useSectionVisibility());
    (
      result.current.ref as React.MutableRefObject<HTMLDivElement | null>
    ).current = document.createElement("div");
    const observerInstance = (window.IntersectionObserver as jest.Mock).mock
      .instances[0];
    // isIntersecting이 true로 트리거
    act(() => {
      observerInstance.trigger(true);
    });
    expect(result.current.isVisible).toBe(true);
  });
});
