import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/src/components/commons/layout/header";

// next/image mock
jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img data-testid="mock-image" {...props} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

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

// Nav mock
jest.mock("@/src/components/commons/layout/nav", () => {
  const MockNav = () => <nav data-testid="mock-nav">MockNav</nav>;
  MockNav.displayName = "MockNav";
  return MockNav;
});

describe("Header component test", () => {
  it("로고, 텍스트, 링크, Nav가 정상적으로 렌더링된다", () => {
    render(<Header />);
    expect(screen.getByText("Korean Dummy JSON")).toBeInTheDocument();
    expect(screen.getByTestId("mock-image")).toBeInTheDocument();
    const link = screen.getByText("Korean Dummy JSON").closest("a");
    expect(link).toHaveAttribute("href", "/");
    expect(screen.getByTestId("mock-nav")).toBeInTheDocument();
  });
});
