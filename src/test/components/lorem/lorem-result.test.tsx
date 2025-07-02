import { render, screen } from "@testing-library/react";
import LoremResult from "@/src/components/lorem/lorem-result";

describe("LoremResult component test", () => {
  it("result가 있으면 해당 텍스트가 표시된다", () => {
    render(<LoremResult result="테스트 결과입니다." />);
    expect(screen.getByText("테스트 결과입니다.")).toBeInTheDocument();
  });

  it("result가 없으면 안내 문구가 표시된다", () => {
    render(<LoremResult result="" />);
    expect(
      screen.getByText("옵션을 선택하고 생성 버튼을 눌러주세요.")
    ).toBeInTheDocument();
  });
});
