import { render, screen } from "@testing-library/react";
import LoremPage from "@/src/components/lorem/lorem-page";
import useLoremOptions from "@/src/hooks/lorem/useLoremOptions";
import useGenerateLorem from "@/src/hooks/lorem/useGenerateLorem";
import LoremHeader from "@/src/components/lorem/lorem-header";
import LoremOptions from "@/src/components/lorem/lorem-options";
import LoremButtonGroup from "@/src/components/lorem/lorem-button-group";
import LoremResult from "@/src/components/lorem/lorem-result";

jest.mock("@/src/hooks/lorem/useLoremOptions");
jest.mock("@/src/hooks/lorem/useGenerateLorem");
jest.mock("@/src/components/lorem/lorem-header");
jest.mock("@/src/components/lorem/lorem-options");
jest.mock("@/src/components/lorem/lorem-button-group");
jest.mock("@/src/components/lorem/lorem-result");

describe("LoremPage component test", () => {
  const mockUseLoremOptions = useLoremOptions as jest.Mock;
  const mockUseGenerateLorem = useGenerateLorem as jest.Mock;
  const mockLoremHeader = LoremHeader as jest.Mock;
  const mockLoremOptions = LoremOptions as jest.Mock;
  const mockLoremButtonGroup = LoremButtonGroup as jest.Mock;
  const mockLoremResult = LoremResult as jest.Mock;

  const options = {
    mode: "paragraph",
    count: 3,
    lengthValue: 10,
    resetByMode: jest.fn()
    // 기타 옵션 생략...
  };
  const setResult = jest.fn();
  const handleGenerate = jest.fn();
  const result = "테스트 결과";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLoremOptions.mockReturnValue(options);
    mockUseGenerateLorem.mockReturnValue({ result, setResult, handleGenerate });
    mockLoremHeader.mockImplementation(() => (
      <div data-testid="lorem-header">Header</div>
    ));
    mockLoremOptions.mockImplementation(() => (
      <div data-testid="lorem-options">Options</div>
    ));
    mockLoremButtonGroup.mockImplementation(() => (
      <div data-testid="lorem-button-group">ButtonGroup</div>
    ));
    mockLoremResult.mockImplementation(() => (
      <div data-testid="lorem-result">Result</div>
    ));
  });

  it("하위 컴포넌트들이 정상적으로 렌더링된다", () => {
    render(<LoremPage />);
    expect(screen.getByTestId("lorem-header")).toBeInTheDocument();
    expect(screen.getByTestId("lorem-options")).toBeInTheDocument();
    expect(screen.getByTestId("lorem-button-group")).toBeInTheDocument();
    expect(screen.getByTestId("lorem-result")).toBeInTheDocument();
  });

  it("LoremOptions에 options가 올바르게 전달된다", () => {
    render(<LoremPage />);
    expect(mockLoremOptions).toHaveBeenCalled();
    const props = mockLoremOptions.mock.calls[0][0];
    expect(props).toMatchObject(options);
  });

  it("LoremButtonGroup에 result, mode, resetByMode, setResult, onGenerate가 올바르게 전달된다", () => {
    render(<LoremPage />);
    expect(mockLoremButtonGroup).toHaveBeenCalled();
    const props = mockLoremButtonGroup.mock.calls[0][0];
    expect(props.result).toBe(result);
    expect(props.mode).toBe(options.mode);
    expect(props.resetByMode).toBe(options.resetByMode);
    expect(props.setResult).toBe(setResult);
    expect(props.onGenerate).toBe(handleGenerate);
  });

  it("LoremResult에 result가 올바르게 전달된다", () => {
    render(<LoremPage />);
    expect(mockLoremResult).toHaveBeenCalled();
    const props = mockLoremResult.mock.calls[0][0];
    expect(props.result).toBe(result);
  });
});
