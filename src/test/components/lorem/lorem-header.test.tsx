import { render, screen } from "@testing-library/react";
import LoremHeader from "@/src/components/lorem/lorem-header";

describe("LoremHeader component test", () => {
  it("헤더와 설명 텍스트가 정상적으로 렌더링된다", () => {
    render(<LoremHeader />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "한글 로렘 입숨 생성기"
    );
    expect(screen.getByText(/문단\/문장\/단어/)).toBeInTheDocument();
    expect(screen.getByText(/모드를 선택하고, 개수와 글자 수를 자유롭게 지정해 한글 더미 텍스트를 즉시 생성하세요/)).toBeInTheDocument();
  });
});
