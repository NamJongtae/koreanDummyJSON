import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileNavDocsMenuList from "@/src/components/commons/layout/mobile-nav/mobile-nav-docs-menu-list";

// DOCS_MENU mock
jest.mock("@/src/constants/constants", () => ({
  DOCS_MENU: ["Intro", "Guide", "API"]
}));

// next/link mock
jest.mock("next/link", () => {
  const MockLink = React.forwardRef<any, any>(function MockLink(
    { href, children, prefetch, ...props },
    ref
  ) {
    return (
      <a href={href} ref={ref} {...props}>
        {children}
      </a>
    );
  });
  MockLink.displayName = "MockLink";
  return MockLink;
});

// usePathname mock
jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}));

import { usePathname } from "next/navigation";

describe("MobileNavDocsMenuList component test", () => {
  const arcodianRef = { current: null };
  const setDocsMenuListRef = jest.fn(
    () =>
      ({
        current: null
      }) as React.MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>
  );
  const handleDocsMenuFocusOnTab = jest.fn();
  const handleKeyDownEsc = jest.fn();
  const toggleNavMenu = jest.fn();
  const toggleDocsMenu = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue("/docs/guide");
  });

  it("DOCS_MENU의 각 항목이 링크로 렌더링된다", () => {
    render(
      <MobileNavDocsMenuList
        isOpenDocsMenu={true}
        arcodianRef={arcodianRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleDocsMenuFocusOnTab={handleDocsMenuFocusOnTab}
        handleKeyDownEsc={handleKeyDownEsc}
        toggleNavMenu={toggleNavMenu}
        toggleDocsMenu={toggleDocsMenu}
      />
    );
    expect(screen.getByText("Intro")).toBeInTheDocument();
    expect(screen.getByText("Guide")).toBeInTheDocument();
    expect(screen.getByText("API")).toBeInTheDocument();
    expect(screen.getByText("Guide").closest("a")).toHaveAttribute(
      "href",
      "/docs/guide"
    );
  });

  it("현재 경로와 일치하는 링크에 파란색 스타일 클래스가 적용된다", () => {
    render(
      <MobileNavDocsMenuList
        isOpenDocsMenu={true}
        arcodianRef={arcodianRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleDocsMenuFocusOnTab={handleDocsMenuFocusOnTab}
        handleKeyDownEsc={handleKeyDownEsc}
        toggleNavMenu={toggleNavMenu}
        toggleDocsMenu={toggleDocsMenu}
      />
    );
    expect(screen.getByText("Guide").closest("a")).toHaveClass("text-blue-400");
    expect(screen.getByText("Intro").closest("a")).toHaveClass("text-black");
  });

  it("onClick, onKeyDown, ref, handleDocsMenuFocusOnTab이 정상적으로 전달된다", () => {
    render(
      <MobileNavDocsMenuList
        isOpenDocsMenu={true}
        arcodianRef={arcodianRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleDocsMenuFocusOnTab={handleDocsMenuFocusOnTab}
        handleKeyDownEsc={handleKeyDownEsc}
        toggleNavMenu={toggleNavMenu}
        toggleDocsMenu={toggleDocsMenu}
      />
    );
    const link = screen.getByText("Intro").closest("a")!;
    fireEvent.click(link);
    expect(toggleNavMenu).toHaveBeenCalled();

    fireEvent.keyDown(link, { key: "Tab" });
    expect(handleDocsMenuFocusOnTab).toHaveBeenCalled();
  });

  it("ul에서 keyDown 이벤트 발생 시 handleKeyDownEsc가 호출된다", () => {
    render(
      <MobileNavDocsMenuList
        isOpenDocsMenu={true}
        arcodianRef={arcodianRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleDocsMenuFocusOnTab={handleDocsMenuFocusOnTab}
        handleKeyDownEsc={handleKeyDownEsc}
        toggleNavMenu={toggleNavMenu}
        toggleDocsMenu={toggleDocsMenu}
      />
    );
    const ul = screen.getByRole("list");
    fireEvent.keyDown(ul, { key: "Escape" });
    expect(handleKeyDownEsc).toHaveBeenCalled();
  });
});
