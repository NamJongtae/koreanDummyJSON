import { render, screen } from "@testing-library/react";
import QuoteIcon from "@/src/components/home/home-intro/quote-icon";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img data-testid="mock-image" {...props} />
}));

describe("QuoteIcon 컴포넌트", () => {
  it("position이 top일 때 올바른 className과 이미지 속성으로 렌더링된다", () => {
    render(<QuoteIcon position="top" />);
    const img = screen.getByTestId("mock-image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/icons/double-quotes-left-icon.svg");
    expect(img).toHaveAttribute("alt", '"');
    expect(img).toHaveAttribute("width", "50");
    expect(img).toHaveAttribute("height", "50");
    expect(img.className).toContain("left-3");
    expect(img.className).toContain("-top-4");
    expect(img.className).toContain("absolute");
  });

  it("position이 bottom일 때 올바른 className과 이미지 속성으로 렌더링된다", () => {
    render(<QuoteIcon position="bottom" />);
    const img = screen.getByTestId("mock-image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/icons/double-quotes-left-icon.svg");
    expect(img).toHaveAttribute("alt", '"');
    expect(img).toHaveAttribute("width", "50");
    expect(img).toHaveAttribute("height", "50");
    expect(img.className).toContain("right-3");
    expect(img.className).toContain("-bottom-4");
    expect(img.className).toContain("absolute");
  });
});
