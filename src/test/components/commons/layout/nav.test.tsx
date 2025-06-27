import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "@/src/components/commons/layout/nav";

// next/link mock
jest.mock("next/link", () => {
  const MockLink = ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

// usePathname mock
jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}));

// NavDocsMenu mock
jest.mock("@/src/components/commons/layout/nav-docs-menu", () => {
  const MockDocsMenu = () => (
    <div data-testid="mock-docs-menu">MockDocsMenu</div>
  );
  MockDocsMenu.displayName = "MockDocsMenu";
  return MockDocsMenu;
});

// MobileNavBtn mock
jest.mock("@/src/components/commons/layout/mobile-nav/mobile-nav-btn", () => {
  const MockMobileNavBtn = () => (
    <button data-testid="mock-mobile-nav-btn">MockMobileNavBtn</button>
  );
  MockMobileNavBtn.displayName = "MockMobileNavBtn";
  return MockMobileNavBtn;
});

import { usePathname } from "next/navigation";

describe("Nav", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("HOME, GUIDE, NavDocsMenu, MobileNavBtn이 렌더링된다", () => {
    render(<Nav />);
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("GUIDE")).toBeInTheDocument();
    expect(screen.getByTestId("mock-docs-menu")).toBeInTheDocument();
    expect(screen.getByTestId("mock-mobile-nav-btn")).toBeInTheDocument();
  });

  it("/ 경로일 때 HOME 링크에 파란색 클래스가 적용된다", () => {
    render(<Nav />);
    expect(screen.getByText("HOME").closest("a")).toHaveClass("text-blue-400");
  });

  it("/guide 경로일 때 GUIDE 링크에 파란색 클래스가 적용된다", () => {
    (usePathname as jest.Mock).mockReturnValue("/guide");
    render(<Nav />);
    expect(screen.getByText("GUIDE").closest("a")).toHaveClass("text-blue-400");
  });
});
