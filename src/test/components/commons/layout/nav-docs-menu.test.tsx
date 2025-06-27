import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavDocsMenu from "@/src/components/commons/layout/nav-docs-menu";

// usePathname mock
jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}));

// useNavDocsMenu mock
jest.mock("@/src/hooks/layout-nav/useNavDocsMenu", () => jest.fn());

// NavDocsMenuList mock
jest.mock("@/src/components/commons/layout/nav-docs-menu-list", () => {
  const MockMenuList = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div data-testid="mock-menu-list" ref={ref}>
      {JSON.stringify(props)}
    </div>
  ));
  MockMenuList.displayName = "MockMenuList";
  return MockMenuList;
});

import { usePathname } from "next/navigation";
import useNavDocsMenu from "@/src/hooks/layout-nav/useNavDocsMenu";

describe("NavDocsMenu", () => {
  const mockMenu = {
    isOpenDocsMenu: false,
    toggleDocsMenu: jest.fn(),
    docsMenuRef: { current: null },
    setDocsMenuListRef: jest.fn(() => ({ current: null })),
    handleKeyDownEsc: jest.fn(),
    handleKeyDownTabDocsMenu: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue("/");
    (useNavDocsMenu as jest.Mock).mockReturnValue(mockMenu);
  });

  it("버튼과 DOCS 텍스트가 렌더링된다", () => {
    render(<NavDocsMenu />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("DOCS")).toBeInTheDocument();
  });

  it("/docs 경로일 때 버튼에 파란색 클래스가 적용된다", () => {
    (usePathname as jest.Mock).mockReturnValue("/docs/guide");
    render(<NavDocsMenu />);
    expect(screen.getByRole("button")).toHaveClass("text-blue-400");
  });

  it("버튼 클릭 시 toggleDocsMenu가 호출된다", () => {
    render(<NavDocsMenu />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockMenu.toggleDocsMenu).toHaveBeenCalled();
  });

  it("버튼 keyDown 시 handleKeyDownEsc가 호출된다", () => {
    render(<NavDocsMenu />);
    fireEvent.keyDown(screen.getByRole("button"), { key: "Tab" });
    expect(mockMenu.handleKeyDownEsc).toHaveBeenCalled();
  });

  it("isOpenDocsMenu가 true면 NavDocsMenuList가 렌더링된다", () => {
    (useNavDocsMenu as jest.Mock).mockReturnValue({
      ...mockMenu,
      isOpenDocsMenu: true
    });
    render(<NavDocsMenu />);
    expect(screen.getByTestId("mock-menu-list")).toBeInTheDocument();
  });
});
