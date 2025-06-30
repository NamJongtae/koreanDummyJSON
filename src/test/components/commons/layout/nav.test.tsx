import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "@/src/components/commons/layout/nav";

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


jest.mock("@/src/components/commons/layout/nav-docs-menu", () => {
  const MockDocsMenu = () => (
    <div data-testid="mock-docs-menu">MockDocsMenu</div>
  );
  MockDocsMenu.displayName = "MockDocsMenu";
  return MockDocsMenu;
});

jest.mock("@/src/components/commons/layout/mobile-nav/mobile-nav-btn", () => {
  const MockMobileNavBtn = () => (
    <button data-testid="mock-mobile-nav-btn">MockMobileNavBtn</button>
  );
  MockMobileNavBtn.displayName = "MockMobileNavBtn";
  return MockMobileNavBtn;
});

const mockNavLink = jest.fn();
jest.mock("@/src/components/commons/layout/nav-link", () => {
  const MockNavLink = (props: { label: string }) => {
    mockNavLink(props);
    return (
      <a data-testid="mock-nav-link" {...props}>
        {props.label}
      </a>
    );
  };
  MockNavLink.displayName = "MockNavLink";
  return MockNavLink;
});

describe("Nav component test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("NavLink가 3번, NavDocsMenu, MobileNavBtn가 렌더링되고, 각 props(href, label)가 올바르게 전달된다", () => {
    render(<Nav />);
    expect(mockNavLink).toHaveBeenCalledTimes(3);
    expect(mockNavLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ href: "/", label: "HOME" })
    );
    expect(mockNavLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ href: "/lorem", label: "LOREM" })
    );
    expect(mockNavLink).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ href: "/guide", label: "GUIDE" })
    );
    expect(screen.getByTestId("mock-docs-menu")).toBeInTheDocument();
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("LOREM")).toBeInTheDocument();
    expect(screen.getByText("GUIDE")).toBeInTheDocument();
    expect(screen.getByTestId("mock-docs-menu")).toBeInTheDocument();
    expect(screen.getByTestId("mock-mobile-nav-btn")).toBeInTheDocument();
  });
});
