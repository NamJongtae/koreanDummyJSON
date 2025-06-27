import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TopBtn from "@/src/components/commons/top-btn";

beforeAll(() => {
  Object.defineProperty(window, "scrollTo", {
    value: jest.fn(),
    writable: true
  });
});

describe("TopBtn component test", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    jest.clearAllMocks();
  });

  it("초기에는 버튼이 숨겨져 있다", () => {
    render(<TopBtn />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("opacity-0");
  });

  it("스크롤이 300px 이상이면 버튼이 나타난다", () => {
    render(<TopBtn />);
    Object.defineProperty(window, "scrollY", { value: 400, writable: true });
    fireEvent.scroll(window);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("opacity-100");
  });

  it("버튼 클릭 시 window.scrollTo가 호출된다", () => {
    render(<TopBtn />);
    Object.defineProperty(window, "scrollY", { value: 400, writable: true });
    fireEvent.scroll(window);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth"
    });
  });
});
