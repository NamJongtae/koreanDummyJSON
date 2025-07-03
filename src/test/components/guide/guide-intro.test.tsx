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
        /현재 가이드는 Fetch API를 사용하여 다양한 예시를 제공합니다./
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /예시 코드를 복사하여 브라우저의 콘솔에 붙여 넣으면 간단하게 실행해볼 수 있습니다./
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Auth-Resource, Image-Resource, Lorem-Resource를 제외한 모든 리소스에 대해 동일한 사용 방법을 따릅니다./
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Auth-Resource, Image-Resource, Lorem-Resource에 대한 설명은 가이드에서 제공되지 않으며, Docs에서 확인하실 수 있습니다./
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/각 리소스에 대한 더 자세한 설명은/)
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
