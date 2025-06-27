import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/src/components/commons/layout/footer";

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

describe("Footer", () => {
  it("텍스트와 링크가 정상적으로 렌더링된다", () => {
    render(<Footer />);
    expect(
      screen.getByText("© 2024 Korean Dummy JSON. All Rights Reserved.")
    ).toBeInTheDocument();
    expect(screen.getByText("Post Images from")).toBeInTheDocument();
    const link = screen.getByText("Lorem Picsum").closest("a");
    expect(link).toHaveAttribute("href", "https://picsum.photos/");
    expect(link).toHaveClass("text-blue-600");
  });
});
