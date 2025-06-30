import React from "react";
import { render, screen } from "@testing-library/react";
import NavLink from "@/src/components/commons/layout/nav-link";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  const MockLink = ({ href, children, ...props }: any) => (
    <a href={href} {...props} data-testid="mock-link">
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}));

import { usePathname } from "next/navigation";

describe("NavLink component test", () => {
  const defaultProps = {
    href: "/test",
    label: "테스트 링크"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Link가 정상적으로 렌더링된다", () => {
    (usePathname as jest.Mock).mockReturnValue("/other");
    render(<NavLink {...defaultProps} />);
    expect(screen.getByText("테스트 링크")).toBeInTheDocument();
  });

  it("href가 정상적으로 적용된다", () => {
    (usePathname as jest.Mock).mockReturnValue("/other");
    render(<NavLink {...defaultProps} />);
    expect(screen.getByTestId("mock-link")).toHaveAttribute("href", "/test");
  });

  it("현재 경로일 때 text-blue-400 클래스가 적용된다", () => {
    (usePathname as jest.Mock).mockReturnValue("/test");
    render(<NavLink {...defaultProps} />);
    expect(screen.getByTestId("mock-link")).toHaveClass("text-blue-400");
  });

  it("다른 경로일 때 text-blue-400 클래스가 적용되지 않는다", () => {
    (usePathname as jest.Mock).mockReturnValue("/other");
    render(<NavLink {...defaultProps} />);
    expect(screen.getByTestId("mock-link")).not.toHaveClass("text-blue-400");
  });
});
