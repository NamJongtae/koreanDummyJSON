import { render, screen } from "@testing-library/react";
import HomeIntro from "@/src/components/home/home-intro/home-intro";
import ApiRequestCount from "@/src/components/home/home-intro/api-request-count";
import useSectionVisibility from "@/src/hooks/commons/useSectionVisibility";

jest.mock("@/src/hooks/commons/useSectionVisibility");
jest.mock("@/src/components/home/home-intro/api-request-count");
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  )
}));

jest.mock("@/src/components/home/home-intro/home-intro-content", () => ({
  __esModule: true,
  default: () => <div data-testid="home-intro-content">HomeIntroContent</div>
}));

describe("HomeIntro component test", () => {
  const mockUseSectionVisibility = useSectionVisibility as jest.Mock;
  const mockApiRequestCount = ApiRequestCount as jest.Mock;
  const mockRef = { current: null };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSectionVisibility.mockImplementation(() => ({
      ref: mockRef,
      isVisible: true
    }));
  });

  it("isVisible 값에 따라 opacity 클래스가 올바르게 적용된다", () => {
    // isVisible: false
    mockUseSectionVisibility.mockImplementation(() => ({
      ref: mockRef,
      isVisible: false
    }));
    mockApiRequestCount.mockImplementation(() => <div />);
    const { rerender, container } = render(<HomeIntro />);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("opacity-0");

    // isVisible: true
    mockUseSectionVisibility.mockImplementation(() => ({
      ref: mockRef,
      isVisible: true
    }));
    rerender(<HomeIntro />);
    expect(section.className).toContain("opacity-100");
  });

  it("헤더, HomeIntroContent 컴포넌트가 렌더링된다.", () => {
    render(<HomeIntro />);

    expect(
      screen.getByRole("heading", { level: 2, name: /Korean Dummy JSON/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId("home-intro-content")).toBeInTheDocument();
  });

  it("section 태그에 useSectionVisibility의 ref가 전달되는지 확인한다", () => {
    const { container } = render(<HomeIntro />);
    const section = container.querySelector("section");
    expect(mockRef.current).toBe(section);
  });
});
