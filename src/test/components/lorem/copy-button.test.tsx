import { render, fireEvent, screen } from "@testing-library/react";
import CopyButton from "@/src/components/lorem/copy-button";
import useCopy from "@/src/hooks/commons/useCopy";

jest.mock("@/src/hooks/commons/useCopy");

describe("CopyButton component test", () => {
  const mockUseCopy = useCopy as jest.Mock;
  const handleCopy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCopy.mockReturnValue({
      isCopied: false,
      handleCopy,
    });
  });

  it("'복사' 버튼이 정상적으로 렌더링된다", () => {
    render(<CopyButton result="테스트" disabled={false} />);
    expect(screen.getByText("복사")).toBeInTheDocument();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("버튼 클릭 시 handleCopy가 호출된다", () => {
    render(<CopyButton result="테스트" disabled={false} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleCopy).toHaveBeenCalled();
  });

  it("isCopied가 true면 '복사됨'이 표시된다", () => {
    mockUseCopy.mockReturnValue({
      isCopied: true,
      handleCopy,
    });
    render(<CopyButton result="테스트" disabled={false} />);
    expect(screen.getByText("복사됨")).toBeInTheDocument();
  });

  it("disabled가 true면 버튼이 비활성화된다", () => {
    render(<CopyButton result="테스트" disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
