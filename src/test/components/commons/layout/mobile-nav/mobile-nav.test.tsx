import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileNav from "@/src/components/commons/layout/mobile-nav/mobile-nav";
import { MobileNavContext } from "@/src/store/mobile-nav-provider";

// useThrottle mock
jest.mock("@/src/hooks/commons/useThrottle", () => ({
  __esModule: true,
  default: () => (fn: any) => fn
}));

// MobileNavList mock
jest.mock("@/src/components/commons/layout/mobile-nav/mobile-nav-list", () => {
  const MockNavList = () => <div data-testid="mock-nav-list">MockNavList</div>;
  MockNavList.displayName = "MockNavList";
  return MockNavList;
});

describe("MobileNav component test", () => {
  const toggleMenu = jest.fn();
  const closeMenu = jest.fn();
  const navMenuRef = { current: null };

  function renderWithContext(isOpenMenu: boolean) {
    return render(
      <MobileNavContext.Provider
        value={{
          isOpenMenu,
          toggleMenu,
          closeMenu,
          menuRef: navMenuRef
        }}
      >
        <MobileNav />
      </MobileNavContext.Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("isOpenMenu가 true면 오버레이와 MobileNavList가 렌더링된다", () => {
    renderWithContext(true);
    expect(screen.getByTestId("mock-nav-list")).toBeInTheDocument();
    expect(screen.getByRole("overlay")).toBeInTheDocument();
  });

  it("isOpenMenu가 false면 아무것도 렌더링되지 않는다", () => {
    renderWithContext(false);
    expect(screen.queryByTestId("mock-nav-list")).not.toBeInTheDocument();
    expect(screen.queryByRole("overlay")).not.toBeInTheDocument();
  });

  it("오버레이 클릭 시 toggleMenu가 호출된다", () => {
    renderWithContext(true);
    const overlay = screen.getByRole("overlay");
    fireEvent.click(overlay);
    expect(toggleMenu).toHaveBeenCalled();
  });

  it("resize 이벤트 발생 시 closeMenu가 호출된다 (width >= 640)", () => {
    renderWithContext(true);
    Object.defineProperty(window, "innerWidth", { value: 700, writable: true });
    fireEvent(window, new Event("resize"));
    expect(closeMenu).toHaveBeenCalled();
  });
});
