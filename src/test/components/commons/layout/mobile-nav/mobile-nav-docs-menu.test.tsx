import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileNavDocsMenu from "@/src/components/commons/layout/mobile-nav/mobile-nav-docs-menu";

// next/image mock
jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img data-testid="mock-image" {...props} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

// usePathname mock
jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}));

// MobileNavDocsMenuList mock
const mockMobileNavDocsMenuList = jest.fn();
jest.mock(
  "@/src/components/commons/layout/mobile-nav/mobile-nav-docs-menu-list",
  () => {
    return {
      __esModule: true,
      default: (props: Record<string, unknown>) => {
        mockMobileNavDocsMenuList(props);
        return <div data-testid="mock-menu-list">Mock Menu List</div>;
      }
    };
  }
);

import { usePathname } from "next/navigation";

describe("MobileNavDocsMenu component test", () => {
  const toggleNavMenu = jest.fn();
  const isOpenDocsMenu = true;
  const toggleDocsMenu = jest.fn();
  const arcodianRef = { current: null };
  const lastNavMenuRef = { current: null };
  const setDocsMenuListRef = jest.fn(
    () =>
      ({ current: null }) as React.MutableRefObject<
        HTMLButtonElement | HTMLAnchorElement | null
      >
  );
  const handleDocsBtnFocusOnTab = jest.fn();
  const handleDocsMenuFocusOnTab = jest.fn();
  const handleKeyDownEsc = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue("/docs/guide");
  });

  it("버튼과 아이콘, DOCS 텍스트가 렌더링된다", () => {
    render(
      <MobileNavDocsMenu
        toggleNavMenu={toggleNavMenu}
        isOpenDocsMenu={isOpenDocsMenu}
        toggleDocsMenu={toggleDocsMenu}
        arcodianRef={arcodianRef}
        lastNavMenuRef={lastNavMenuRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleDocsBtnFocusOnTab={handleDocsBtnFocusOnTab}
        handleDocsMenuFocusOnTab={handleDocsMenuFocusOnTab}
        handleKeyDownEsc={handleKeyDownEsc}
      />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("DOCS")).toBeInTheDocument();
    expect(screen.getByTestId("mock-image")).toBeInTheDocument();
  });

  it("/docs 경로일 때 버튼에 파란색 클래스가 적용된다", () => {
    (usePathname as jest.Mock).mockReturnValue("/docs/guide");
    render(
      <MobileNavDocsMenu
        toggleNavMenu={toggleNavMenu}
        isOpenDocsMenu={isOpenDocsMenu}
        toggleDocsMenu={toggleDocsMenu}
        arcodianRef={arcodianRef}
        lastNavMenuRef={lastNavMenuRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleDocsBtnFocusOnTab={handleDocsBtnFocusOnTab}
        handleDocsMenuFocusOnTab={handleDocsMenuFocusOnTab}
        handleKeyDownEsc={handleKeyDownEsc}
      />
    );
    expect(screen.getByRole("button")).toHaveClass("text-blue-400");
  });

  it("버튼 클릭 시 toggleDocsMenu가 호출된다", () => {
    render(
      <MobileNavDocsMenu
        toggleNavMenu={toggleNavMenu}
        isOpenDocsMenu={isOpenDocsMenu}
        toggleDocsMenu={toggleDocsMenu}
        arcodianRef={arcodianRef}
        lastNavMenuRef={lastNavMenuRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleDocsBtnFocusOnTab={handleDocsBtnFocusOnTab}
        handleDocsMenuFocusOnTab={handleDocsMenuFocusOnTab}
        handleKeyDownEsc={handleKeyDownEsc}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(toggleDocsMenu).toHaveBeenCalled();
  });

  it("버튼 keyDown 시 handleDocsBtnFocusOnTab이 호출된다", () => {
    render(
      <MobileNavDocsMenu
        toggleNavMenu={toggleNavMenu}
        isOpenDocsMenu={isOpenDocsMenu}
        toggleDocsMenu={toggleDocsMenu}
        arcodianRef={arcodianRef}
        lastNavMenuRef={lastNavMenuRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleDocsBtnFocusOnTab={handleDocsBtnFocusOnTab}
        handleDocsMenuFocusOnTab={handleDocsMenuFocusOnTab}
        handleKeyDownEsc={handleKeyDownEsc}
      />
    );
    fireEvent.keyDown(screen.getByRole("button"), { key: "Tab" });
    expect(handleDocsBtnFocusOnTab).toHaveBeenCalled();
  });

  it("MobileNavDocsMenuList에 올바른 props가 전달된다", () => {
    render(
      <MobileNavDocsMenu
        toggleNavMenu={toggleNavMenu}
        isOpenDocsMenu={isOpenDocsMenu}
        toggleDocsMenu={toggleDocsMenu}
        arcodianRef={arcodianRef}
        lastNavMenuRef={lastNavMenuRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleDocsBtnFocusOnTab={handleDocsBtnFocusOnTab}
        handleDocsMenuFocusOnTab={handleDocsMenuFocusOnTab}
        handleKeyDownEsc={handleKeyDownEsc}
      />
    );
    expect(mockMobileNavDocsMenuList).toHaveBeenCalled();

    const calledProps = mockMobileNavDocsMenuList.mock.calls[0][0];
    expect(calledProps).toHaveProperty("isOpenDocsMenu");
    expect(calledProps).toHaveProperty("arcodianRef");
    expect(calledProps).toHaveProperty("setDocsMenuListRef");
    expect(calledProps).toHaveProperty("handleKeyDownEsc");
    expect(calledProps).toHaveProperty("handleDocsMenuFocusOnTab");
    expect(calledProps).toHaveProperty("toggleNavMenu");
    expect(calledProps).toHaveProperty("toggleDocsMenu");
  });
});
