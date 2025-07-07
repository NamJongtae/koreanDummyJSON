import React from "react";
import { render, screen } from "@testing-library/react";
import GuideIntro from "@/src/components/guide/guide-intro";
import "@testing-library/jest-dom";

describe("GuideIntro component test", () => {
  it("heading, 안내 문구, 경고 문구, Docs 링크가 정상적으로 렌더링된다", () => {
    render(<GuideIntro />);

    // heading
    expect(screen.getByRole("heading", { name: /guide/i })).toBeInTheDocument();

    // 안내 문구
    expect(
      screen.getByText(
        "기본 6가지 Resources(users, todos, posts, comments, books, reviews)",
        { selector: "b" }
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/를 대상으로 Fetch API를 사용한 예시를 제공합니다./)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /예시 코드를 복사하여 브라우저 개발자 도구 콘솔에 붙여 넣으면 간단하게 실행해볼 수 있습니다./
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/korean-dummy-json-fetcher 라이브러리 혹은 CDN/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/각 Resource에 대한 더 자세한 설명은/)
    ).toBeInTheDocument();

    // Docs 링크
    const docsLink = screen.getByRole("link", { name: /docs/i });
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute("href", "/docs/users");

    // 경고 문구
    expect(
      screen.getByText(
        /POST, PUT, PATCH, DELETE Method는 실제 서버 DB에는 영향을 주지 않으며, 더미 데이터로 처리됩니다./
      )
    ).toBeInTheDocument();
  });
});
