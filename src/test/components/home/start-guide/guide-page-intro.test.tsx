import { render, screen } from "@testing-library/react";
import GuidePageIntro from "@/src/components/home/start-guide/guide-page-intro";

describe("GuidePageIntro component test", () => {
  it("설명 텍스트와 링크가 모두 렌더링된다", () => {
    render(<GuidePageIntro />);
    // 설명 텍스트
    expect(
      screen.getByText(
        /아래 가이드 페이지를 통해 쉽고 편리하게 Korean Dummy JSON를 사용할 수 있습니다/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/예시 코드가 제공되어 복사하여 바로 사용할 수 있습니다/)
    ).toBeInTheDocument();
    // 링크
    const link = screen.getByRole("link", { name: /🚀 Start Guide/ });
    expect(link).toHaveAttribute("href", "/guide");
  });
});
