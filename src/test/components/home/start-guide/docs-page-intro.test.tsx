import { render, screen } from "@testing-library/react";
import DocsPageIntro from "@/src/components/home/start-guide/docs-page-intro";

describe("DocsPageIntro component test", () => {
  it("제목, 설명, 링크가 모두 렌더링된다", () => {
    render(<DocsPageIntro />);
    // 제목
    expect(
      screen.getByRole("heading", { name: /📃 DOCS 살펴보기/ })
    ).toBeInTheDocument();
    // 설명 텍스트
    expect(
      screen.getByText(/DOCS 페이지는 각 Resources별 상세 설명을 제공합니다/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/또한, Resources별 모든 Enpoints 예시 코드를 제공합니다/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/아래 DOCS 페이지에서 자세히 살펴보세요/)
    ).toBeInTheDocument();
    // 링크
    const link = screen.getByRole("link", {
      name: /✨ DOCS 페이지로 바로가기/
    });
    expect(link).toHaveAttribute("href", "/docs/users");
  });
});
