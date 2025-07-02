import { render, fireEvent, screen } from "@testing-library/react";
import GenerateButton from "@/src/components/lorem/generate-button";

describe("GenerateButton component test", () => {
  const onGenerate = jest.fn();

  it("'생성' 버튼이 정상적으로 렌더링된다", () => {
    render(<GenerateButton onGenerate={onGenerate} />);
    expect(screen.getByText("생성")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("버튼 클릭 시 onGenerate가 호출된다", () => {
    render(<GenerateButton onGenerate={onGenerate} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onGenerate).toHaveBeenCalled();
  });
});
