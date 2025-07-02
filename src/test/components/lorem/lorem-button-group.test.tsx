import { render, screen } from "@testing-library/react";
import LoremButtonGroup from "@/src/components/lorem/lorem-button-group";
import GenerateButton from "@/src/components/lorem/generate-button";
import CopyButton from "@/src/components/lorem/copy-button";
import ResetButton from "@/src/components/lorem/reset-button";

jest.mock("@/src/components/lorem/generate-button");
jest.mock("@/src/components/lorem/copy-button");
jest.mock("@/src/components/lorem/reset-button");

describe("LoremButtonGroup component test", () => {
  const mockGenerateButton = GenerateButton as jest.Mock;
  const mockCopyButton = CopyButton as jest.Mock;
  const mockResetButton = ResetButton as jest.Mock;
  const onGenerate = jest.fn();
  const resetByMode = jest.fn();
  const setResult = jest.fn();
  const mode = "paragraph";

  beforeEach(() => {
    jest.clearAllMocks();
    mockGenerateButton.mockImplementation((props) => (
      <button {...props}>생성</button>
    ));
    mockCopyButton.mockImplementation((props) => (
      <button {...props}>복사</button>
    ));
    mockResetButton.mockImplementation((props) => (
      <button {...props}>리셋</button>
    ));
  });

  it("'생성', '복사', '리셋' 버튼이 렌더링된다", () => {
    render(
      <LoremButtonGroup
        result="테스트 결과"
        mode={mode}
        resetByMode={resetByMode}
        setResult={setResult}
        onGenerate={onGenerate}
      />
    );
    expect(screen.getByText("생성")).toBeInTheDocument();
    expect(screen.getByText("복사")).toBeInTheDocument();
    expect(screen.getByText("리셋")).toBeInTheDocument();
  });

  it("GenerateButton에 onGenerate prop이 올바르게 전달된다", () => {
    render(
      <LoremButtonGroup
        result="테스트 결과"
        mode={mode}
        resetByMode={resetByMode}
        setResult={setResult}
        onGenerate={onGenerate}
      />
    );
    expect(mockGenerateButton).toHaveBeenCalled();
    const props = mockGenerateButton.mock.calls[0][0];
    expect(props.onGenerate).toBe(onGenerate);
  });

  it("CopyButton에 result, disabled props가 올바르게 전달된다", () => {
    render(
      <LoremButtonGroup
        result="테스트 결과"
        mode={mode}
        resetByMode={resetByMode}
        setResult={setResult}
        onGenerate={onGenerate}
      />
    );
    expect(mockCopyButton).toHaveBeenCalled();
    const props = mockCopyButton.mock.calls[0][0];
    expect(props.result).toBe("테스트 결과");
    expect(props.disabled).toBe(false);
  });

  it("ResetButton에 mode, resetByMode, setResult props가 올바르게 전달된다", () => {
    render(
      <LoremButtonGroup
        result="테스트 결과"
        mode={mode}
        resetByMode={resetByMode}
        setResult={setResult}
        onGenerate={onGenerate}
      />
    );
    expect(mockResetButton).toHaveBeenCalled();
    const props = mockResetButton.mock.calls[0][0];
    expect(props.mode).toBe(mode);
    expect(props.resetByMode).toBe(resetByMode);
    expect(props.setResult).toBe(setResult);
  });
});
