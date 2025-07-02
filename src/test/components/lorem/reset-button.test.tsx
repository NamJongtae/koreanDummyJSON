import { render, fireEvent, screen } from "@testing-library/react";
import ResetButton from "@/src/components/lorem/reset-button";
import useResetLorem from "@/src/hooks/lorem/useResetLorem";

jest.mock("@/src/hooks/lorem/useResetLorem");

describe("ResetButton component test", () => {
  const mode = "paragraph";
  const resetByMode = jest.fn();
  const setResult = jest.fn();
  const mockUseResetLorem = useResetLorem as jest.Mock;
  const handleReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseResetLorem.mockReturnValue({ handleReset });
  });

  it("'리셋' 버튼이 정상적으로 렌더링된다", () => {
    render(
      <ResetButton
        mode={mode}
        resetByMode={resetByMode}
        setResult={setResult}
      />
    );
    expect(screen.getByText("리셋")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("버튼 클릭 시 handleReset이 호출된다", () => {
    render(
      <ResetButton
        mode={mode}
        resetByMode={resetByMode}
        setResult={setResult}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleReset).toHaveBeenCalled();
  });
});
