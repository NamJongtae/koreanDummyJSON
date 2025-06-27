import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CopyBtn from "@/src/components/commons/fetch-section/copy-btn";
import useCopy from "@/src/hooks/commons/useCopy";

jest.mock("@/src/hooks/commons/useCopy");

describe("CopyBtn component test", () => {
  const mockHandleCopy = jest.fn();
  const mockUseCopy = jest.mocked(useCopy);
  const target = "console.log('hello world');";

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCopy.mockReturnValue({
      isCopied: false,
      handleCopy: mockHandleCopy
    });
  });

  it("초기 상태에서 '코드 복사' 텍스트를 렌더링한다", () => {
    const target = "console.log('test');";
    render(<CopyBtn target={target} />);

    expect(screen.getByText("코드 복사")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("useCopy 훅에 올바른 target 값을 전달한다", () => {
    render(<CopyBtn target={target} />);

    expect(mockUseCopy).toHaveBeenCalledWith(target);
  });

  it("버튼 클릭 시 handleCopy 함수가 호출된다", () => {
    const target = "function test() {}";

    render(<CopyBtn target={target} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockHandleCopy).toHaveBeenCalledTimes(1);
  });

  it("isCopied가 true일 때 '복사 완료' 텍스트를 표시한다", () => {
    mockUseCopy.mockReturnValue({
      isCopied: true,
      handleCopy: mockHandleCopy
    });

    render(<CopyBtn target={target} />);

    expect(screen.getByText("복사 완료")).toBeInTheDocument();
    expect(screen.queryByText("코드 복사")).not.toBeInTheDocument();
  });

  it("isCopied가 true일 때 애니메이션 클래스가 적용된다", () => {
    mockUseCopy.mockReturnValue({
      isCopied: true,
      handleCopy: mockHandleCopy
    });

    render(<CopyBtn target={target} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("animate-buttonCopyAnimation");
  });

  it("isCopied가 false일 때 애니메이션 클래스가 적용되지 않는다", () => {
    mockUseCopy.mockReturnValue({
      isCopied: false,
      handleCopy: mockHandleCopy
    });

    render(<CopyBtn target={target} />);

    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("animate-buttonCopyAnimation");
  });

  it("복사 상태가 제대로 변경되는지 테스트한다", () => {
    // 초기 상태: 복사되지 않음
    const { rerender } = render(<CopyBtn target={target} />);
    expect(screen.getByText("코드 복사")).toBeInTheDocument();

    // 복사된 상태로 변경
    mockUseCopy.mockReturnValue({
      isCopied: true,
      handleCopy: mockHandleCopy
    });

    rerender(<CopyBtn target={target} />);
    expect(screen.getByText("복사 완료")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass(
      "animate-buttonCopyAnimation"
    );
  });

  it("여러 번 클릭해도 handleCopy가 정상적으로 호출된다", () => {
    render(<CopyBtn target={target} />);

    const button = screen.getByRole("button");

    // 3번 클릭
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandleCopy).toHaveBeenCalledTimes(3);
  });
});
