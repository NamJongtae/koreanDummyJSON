import { render, screen } from "@testing-library/react";
import HomeIntro from "@/src/components/home/home-intro/home-intro";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  )
}));

jest.mock("@/src/components/home/home-intro/home-intro-content", () => ({
  __esModule: true,
  default: () => <div data-testid="home-intro-content">HomeIntroContent</div>
}));

describe("HomeIntro component test", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("헤더, HomeIntroContent 컴포넌트가 렌더링된다.", () => {
    render(<HomeIntro />);

    expect(
      screen.getByRole("heading", { level: 2, name: /Korean Dummy JSON/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId("home-intro-content")).toBeInTheDocument();
  });
});
