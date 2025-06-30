import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileNavMenuLink from "@/src/components/commons/layout/mobile-nav/mobile-nav-menu-link";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  const MockLink = React.forwardRef<HTMLAnchorElement, any>(function MockLink(
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

jest.mock("next/image", () => {
  const MockImage = ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  );
  MockImage.displayName = "MockImage";
  return { __esModule: true, default: MockImage };
});

describe("MobileNavMenuLink component test", () => {
  const defaultProps = {
    href: "/test",
    iconSrc: "/icon.svg",
    iconAlt: "테스트 아이콘",
    children: "테스트 메뉴"
  };

  it("텍스트와 아이콘이 정상적으로 렌더링된다", () => {
    render(<MobileNavMenuLink {...defaultProps} />);
    expect(screen.getByText("테스트 메뉴")).toBeInTheDocument();
    expect(screen.getByAltText("테스트 아이콘")).toBeInTheDocument();
  });

  it("isActive가 true일 때 text-blue-400 클래스가 적용된다", () => {
    render(<MobileNavMenuLink {...defaultProps} isActive />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-blue-400");
  });

  it("isActive가 false일 때 text-blue-400 클래스가 적용되지 않는다", () => {
    render(<MobileNavMenuLink {...defaultProps} isActive={false} />);
    const link = screen.getByRole("link");
    expect(link).not.toHaveClass("text-blue-400");
  });

  it("onClick 이벤트가 정상적으로 동작한다", () => {
    const handleClick = jest.fn();
    render(<MobileNavMenuLink {...defaultProps} onClick={handleClick} />);
    const link = screen.getByRole("link");
    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalled();
  });

  it("onKeyDown 이벤트가 정상적으로 동작한다", () => {
    const handleKeyDown = jest.fn();
    render(<MobileNavMenuLink {...defaultProps} onKeyDown={handleKeyDown} />);
    const link = screen.getByRole("link");
    fireEvent.keyDown(link, { key: "Enter", code: "Enter" });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("refProp이 정상적으로 전달된다", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(<MobileNavMenuLink {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("A");
  });

  it("href prop이 정상적으로 적용된다", () => {
    render(<MobileNavMenuLink {...defaultProps} href="/custom-path" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/custom-path");
  });

  it("className prop이 정상적으로 적용된다", () => {
    render(<MobileNavMenuLink {...defaultProps} className="custom-class" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });
});
