import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileNavBtn from "@/src/components/commons/layout/mobile-nav/mobile-nav-btn";
import { MobileNavContext } from "@/src/store/mobile-nav-provider";

// MenuIcon mock
jest.mock("@/public/icons/menu-icon.svg", () => {
  const MockMenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="menu-icon" {...props} />
  );
  MockMenuIcon.displayName = "MockMenuIcon";
  return MockMenuIcon;
});

describe("MobileNavBtn component test", () => {
  const toggleMenu = jest.fn();

  function renderWithContext(isOpenMenu: boolean) {
    return render(
      <MobileNavContext.Provider
        value={{
          isOpenMenu,
          toggleMenu,
          menuRef: { current: null },
          closeMenu: jest.fn()
        }}
      >
        <MobileNavBtn />
      </MobileNavContext.Provider>
    );
  }

  it("버튼과 sr-only 텍스트가 렌더링된다", () => {
    renderWithContext(false);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("mobile nav button")).toBeInTheDocument();
  });

  it("isOpenMenu가 true면 아이콘에 파란색 스타일 클래스가 적용된다", () => {
    renderWithContext(true);
    const icon = screen.getByTestId("menu-icon");
    expect(icon).toHaveClass("fill-blue-400");
  });

  it("isOpenMenu가 false면 아이콘에 검정색 스타일 클래스가 적용된다", () => {
    renderWithContext(false);
    const icon = screen.getByTestId("menu-icon");
    expect(icon).toHaveClass("fill-black");
  });

  it("버튼 클릭 시 toggleMenu가 호출된다", () => {
    renderWithContext(false);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(toggleMenu).toHaveBeenCalled();
  });
});
