import { render, screen } from "@testing-library/react";
import TryIt from "@/src/components/home/try-it/try-it";
import useSectionVisibility  from "@/src/hooks/commons/useSectionVisibility";

jest.mock("@/src/hooks/commons/useSectionVisibility");
jest.mock("@/src/components/home/try-it/play-code", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-play-code" />
}));

describe("TryIt 컴포넌트", () => {
  const mockUseSectionVisibility = useSectionVisibility as jest.Mock;
  const mockRef = { current: null };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSectionVisibility.mockImplementation(() => ({
      ref: mockRef,
      isVisible: true
    }));
  });

  it("제목, 설명, PlayCode가 모두 렌더링된다", () => {
    render(<TryIt />);
    expect(
      screen.getByRole("heading", { name: "직접 테스트 해보세요" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /아래 Endpoint를 선택하고 코드를 실행하여 데이터를 조회해보세요/
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-play-code")).toBeInTheDocument();
  });

  it("isVisible 값에 따라 opacity/translate 클래스가 올바르게 적용된다", () => {
    // isVisible: false
    mockUseSectionVisibility.mockImplementation(() => ({
      ref: mockRef,
      isVisible: false
    }));
    const { container, rerender } = render(<TryIt />);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("opacity-0");
    expect(section.className).toContain("translate-y-[150px]");

    // isVisible: true
    mockUseSectionVisibility.mockImplementation(() => ({
      ref: mockRef,
      isVisible: true
    }));
    rerender(<TryIt />);
    expect(section.className).toContain("opacity-100");
    expect(section.className).toContain("translate-y-0");
  });

  it("section 태그에 useSectionVisibility의 ref가 전달되는지 확인한다", () => {
    const { container } = render(<TryIt />);
    const section = container.querySelector("section");
    expect(mockRef.current).toBe(section);
  });
});
