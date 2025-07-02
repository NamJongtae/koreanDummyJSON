import { render, screen, fireEvent } from "@testing-library/react";
import LoremOptions from "@/src/components/lorem/lorem-options";

describe("LoremOptions component test", () => {
  const defaultProps = {
    mode: "paragraph" as const,
    setMode: jest.fn(),
    count: 3,
    setCount: jest.fn(),
    countLabel: "문단 수",
    countMin: 1,
    countMax: 10,
    lengthLabel: "문단 길이",
    lengthMin: 5,
    lengthMax: 100,
    lengthValue: 20,
    setLengthValue: jest.fn(),
    modeBadge: "문단 모드",
    clip: jest.fn((v, min, max) => Math.max(min, Math.min(max, v))),
    resetByMode: jest.fn(),
    handleCountChange: jest.fn(),
    handleCountBlur: jest.fn(),
    handleLengthChange: jest.fn(),
    handleLengthBlur: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("모드 버튼, 라벨, 배지, 안내문구가 정상적으로 렌더링된다", () => {
    render(<LoremOptions {...defaultProps} />);
    expect(screen.getByText("문단")).toBeInTheDocument();
    expect(screen.getByText("문장")).toBeInTheDocument();
    expect(screen.getByText("단어")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.countLabel)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.lengthLabel)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.modeBadge)).toBeInTheDocument();
    expect(screen.getByText("개")).toBeInTheDocument();
    expect(screen.getByText("글자")).toBeInTheDocument();
    expect(screen.getByText("(1~10)"));
    expect(screen.getByText("(5~100)"));
  });

  it("문단/문장/단어 버튼 클릭 시 resetByMode가 올바르게 호출된다", () => {
    render(<LoremOptions {...defaultProps} />);
    fireEvent.click(screen.getByText("문단"));
    expect(defaultProps.resetByMode).toHaveBeenCalledWith("paragraph");
    fireEvent.click(screen.getByText("문장"));
    expect(defaultProps.resetByMode).toHaveBeenCalledWith("sentence");
    fireEvent.click(screen.getByText("단어"));
    expect(defaultProps.resetByMode).toHaveBeenCalledWith("word");
  });

  it("count input 값 변경/blur 시 handleCountChange, handleCountBlur가 호출된다", () => {
    render(<LoremOptions {...defaultProps} />);
    const countInput = screen.getAllByRole("textbox")[0];
    fireEvent.change(countInput, { target: { value: "5" } });
    expect(defaultProps.handleCountChange).toHaveBeenCalled();
    fireEvent.blur(countInput);
    expect(defaultProps.handleCountBlur).toHaveBeenCalled();
  });

  it("length input 값 변경/blur 시 handleLengthChange, handleLengthBlur가 호출된다", () => {
    render(<LoremOptions {...defaultProps} />);
    const lengthInput = screen.getAllByRole("textbox")[1];
    fireEvent.change(lengthInput, { target: { value: "30" } });
    expect(defaultProps.handleLengthChange).toHaveBeenCalled();
    fireEvent.blur(lengthInput);
    expect(defaultProps.handleLengthBlur).toHaveBeenCalled();
  });
});
