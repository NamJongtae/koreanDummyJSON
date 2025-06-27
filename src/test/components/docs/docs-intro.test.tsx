import React from "react";
import { render, screen } from "@testing-library/react";
import DocsIntro from "@/src/components/docs/docs-intro";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}));

import { usePathname } from "next/navigation";

describe("DocsIntro component test", () => {
  const setPath = (path: string) => {
    (usePathname as jest.Mock).mockReturnValue(path);
  };

  it("users 경로에서 유저 소개 문구가 렌더링된다", () => {
    setPath("/docs/users");

    render(<DocsIntro />);

    expect(
      screen.getByText("총 20개의 유저 데이터가 제공됩니다.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/POST, PUT, PATCH, DELETE Method/)
    ).toBeInTheDocument();
  });

  it("todos 경로에서 할 일 소개 문구가 렌더링된다", () => {
    setPath("/docs/todos");

    render(<DocsIntro />);

    expect(
      screen.getByText("총 200개의 할 일 데이터가 제공됩니다.")
    ).toBeInTheDocument();
  });

  it("posts 경로에서 게시물 소개 문구가 렌더링된다", () => {
    setPath("/docs/posts");

    render(<DocsIntro />);

    expect(
      screen.getByText("총 100개의 게시물 데이터가 제공됩니다.")
    ).toBeInTheDocument();
  });

  it("comments 경로에서 댓글 소개 문구가 렌더링된다", () => {
    setPath("/docs/comments");

    render(<DocsIntro />);

    expect(
      screen.getByText("총 500개의 댓글 데이터가 제공됩니다.")
    ).toBeInTheDocument();
  });

  it("books 경로에서 책 소개 문구가 렌더링된다", () => {
    setPath("/docs/books");

    render(<DocsIntro />);

    expect(
      screen.getByText("총 100개의 책 데이터가 제공됩니다.")
    ).toBeInTheDocument();
  });

  it("reviews 경로에서 리뷰 소개 문구가 렌더링된다", () => {
    setPath("/docs/reviews");

    render(<DocsIntro />);

    expect(
      screen.getByText("총 500개의 리뷰 데이터가 제공됩니다.")
    ).toBeInTheDocument();
  });

  it("auth 경로에서 인증 소개 문구가 렌더링된다", () => {
    setPath("/docs/auth");

    render(<DocsIntro />);

    expect(
      screen.getByText("로그인 및 인증/인가 기능을 제공합니다.")
    ).toBeInTheDocument();
  });

  it("image 경로에서 이미지 소개 문구와 경고가 렌더링된다", () => {
    setPath("/docs/image");

    render(<DocsIntro />);

    expect(
      screen.getByText(/동적 이미지 생성 기능을 제공합니다/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/이미지의 최대 size는 2560x2560/)
    ).toBeInTheDocument();
  });

  it("알 수 없는 경로에서는 소개 문구가 렌더링되지 않는다", () => {
    setPath("/docs/unknown");

    render(<DocsIntro />);

    expect(
      screen.getByText(/POST, PUT, PATCH, DELETE Method/)
    ).toBeInTheDocument();
  });
});
