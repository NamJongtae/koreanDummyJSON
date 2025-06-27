import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavDocsMenuList from "@/src/components/commons/layout/nav-docs-menu-list";

// DOCS_MENU mock
jest.mock("@/src/constants/constants", () => ({
  DOCS_MENU: ["Intro", "Guide", "API"]
}));

// next/link mock
jest.mock("next/link", () => {
  const MockLink = React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
  >(({ href, children, ...props }, ref) => (
    <a href={href} ref={ref} {...props}>
      {children}
    </a>
  ));
  MockLink.displayName = "MockLink";
  return {
    __esModule: true,
    default: MockLink
  };
});

// usePathname mock
jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}));

import { usePathname } from "next/navigation";

describe("NavDocsMenuList component test", () => {
  const docsMenuRef = { current: null };
  const setDocsMenuListRef = jest.fn(
    () =>
      ({ current: null }) as React.MutableRefObject<
        HTMLAnchorElement | HTMLButtonElement | null
      >
  );
  const handleKeyDownEsc = jest.fn();
  const handleKeyDownTabDocsMenu = jest.fn();
  const toggleDocsMenu = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue("/docs/guide");
  });

  it("DOCS_MENU의 각 항목이 링크로 렌더링된다", () => {
    render(
      <NavDocsMenuList
        ref={docsMenuRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleKeyDownEsc={handleKeyDownEsc}
        handleKeyDownTabDocsMenu={handleKeyDownTabDocsMenu}
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

  it("현재 경로와 일치하는 링크에 파란색 클래스가 적용된다", () => {
    render(
      <NavDocsMenuList
        ref={docsMenuRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleKeyDownEsc={handleKeyDownEsc}
        handleKeyDownTabDocsMenu={handleKeyDownTabDocsMenu}
        toggleDocsMenu={toggleDocsMenu}
      />
    );
    expect(screen.getByText("Guide").closest("a")).toHaveClass("text-blue-400");
    expect(screen.getByText("Intro").closest("a")).toHaveClass("text-black");
  });

  it("onClick, onKeyDown, ref, handleKeyDownTabDocsMenu가 정상적으로 전달된다", () => {
    render(
      <NavDocsMenuList
        ref={docsMenuRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleKeyDownEsc={handleKeyDownEsc}
        handleKeyDownTabDocsMenu={handleKeyDownTabDocsMenu}
        toggleDocsMenu={toggleDocsMenu}
      />
    );
    const link = screen.getByText("Intro").closest("a")!;
    fireEvent.click(link);
    expect(toggleDocsMenu).toHaveBeenCalled();

    fireEvent.keyDown(link, { key: "Tab" });
    expect(handleKeyDownTabDocsMenu).toHaveBeenCalled();
  });

  it("ul에서 keyDown 이벤트 발생 시 handleKeyDownEsc가 호출된다", () => {
    render(
      <NavDocsMenuList
        ref={docsMenuRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleKeyDownEsc={handleKeyDownEsc}
        handleKeyDownTabDocsMenu={handleKeyDownTabDocsMenu}
        toggleDocsMenu={toggleDocsMenu}
      />
    );
    const ul = screen.getByRole("list");
    fireEvent.keyDown(ul, { key: "Escape" });
    expect(handleKeyDownEsc).toHaveBeenCalled();
  });
});
