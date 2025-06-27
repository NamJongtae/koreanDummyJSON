import React from "react";
import { render, screen } from "@testing-library/react";
import DocsTitle from "@/src/components/docs/docs-title";
import { usePathname } from "next/navigation";

jest.mock("next/navigation");

describe("DocsTitle component test", () => {
  const mockUsePathname = usePathname as jest.Mock;
  const setPath = (path: string) => {
    (usePathname as jest.Mock).mockReturnValue(path);
  };

  beforeEach(() => {
    mockUsePathname.mockReturnValue(() => ({
      usePathname: jest.fn()
    }));
  });

  it("users 경로에서 올바른 타이틀이 렌더링된다", () => {
    setPath("/docs/users");
    render(<DocsTitle />);
    expect(screen.getByText("📃 Users Docs")).toBeInTheDocument();
  });

  it("todos 경로에서 올바른 타이틀이 렌더링된다", () => {
    setPath("/docs/todos");
    render(<DocsTitle />);
    expect(screen.getByText("📃 Todos Docs")).toBeInTheDocument();
  });

  it("posts 경로에서 올바른 타이틀이 렌더링된다", () => {
    setPath("/docs/posts");
    render(<DocsTitle />);
    expect(screen.getByText("📃 Posts Docs")).toBeInTheDocument();
  });

  it("임의의 경로에서도 올바른 타이틀이 렌더링된다", () => {
    setPath("/docs/anything");
    render(<DocsTitle />);
    expect(screen.getByText("📃 Anything Docs")).toBeInTheDocument();
  });
});
