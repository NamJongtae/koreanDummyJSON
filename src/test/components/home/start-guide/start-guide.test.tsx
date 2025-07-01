import { render, screen } from "@testing-library/react";
import StartGuide from "@/src/components/home/start-guide/start-guide";
import useSectionVisibility from '@/src/hooks/commons/useSectionVisibility';
jest.mock("@/src/hooks/commons/useSectionVisibility", () => ({
  __esModule: true,
  default: jest.fn()
}));
jest.mock("@/src/components/home/start-guide/npm-cdn-guide", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-npm-cdn-guide" />
}));
jest.mock("@/src/components/home/start-guide/guide-page-intro", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-guide-page-intro" />
}));
jest.mock("@/src/components/home/start-guide/docs-page-intro", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-docs-page-intro" />
}));

describe("StartGuide component test", () => {
  const mockRef = { current: null };
  beforeEach(() => {
    (useSectionVisibility as jest.Mock).mockImplementation(() => ({
      ref: mockRef,
      isVisible: true
    }));
  });

  it("섹션, 제목, NpmCdnGuide, GuidePageIntro, DocsPageIntro가 모두 렌더링된다", () => {
    render(<StartGuide />);
    expect(
      screen.getByRole("heading", { name: "빠른 시작 가이드" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-npm-cdn-guide")).toBeInTheDocument();
    expect(screen.getByTestId("mock-guide-page-intro")).toBeInTheDocument();
    expect(screen.getByTestId("mock-docs-page-intro")).toBeInTheDocument();
  });

  it("isVisible 값에 따라 opacity 클래스가 올바르게 적용된다", () => {
    // isVisible: false
    (useSectionVisibility as jest.Mock).mockImplementation(() => ({
      ref: mockRef,
      isVisible: false
    }));
    const { container, rerender } = render(<StartGuide />);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("opacity-0");

    // isVisible: true
    (useSectionVisibility as jest.Mock).mockImplementation(() => ({
      ref: mockRef,
      isVisible: true
    }));
    rerender(<StartGuide />);
    expect(section.className).toContain("opacity-100");
  });

  it("section 태그에 useSectionVisibility의 ref가 전달되는지 확인한다", () => {
    const { container } = render(<StartGuide />);
    const section = container.querySelector("section");
    expect(mockRef.current).toBe(section);
  });
});
