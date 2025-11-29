import { render, screen } from "@testing-library/react";
import HomeIntroContent from "@/src/components/home/home-intro/home-intro-content";

jest.mock("@/src/components/home/home-intro/quote-icon", () => ({
  __esModule: true,
  default: ({ position }: { position: string }) => (
    <div data-testid={`quote-icon-${position}`}>QuoteIcon-{position}</div>
  )
}));
jest.mock("@/src/components/home/home-intro/home-intro-description", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="home-intro-description">HomeIntroDescription</div>
  )
}));
jest.mock("@/src/components/home/home-intro/api-request-count", () => ({
  __esModule: true,
  default: () => <div data-testid="api-request-count">ApiRequestCount</div>
}));
jest.mock("@/src/components/home/home-intro/home-intro-links", () => ({
  __esModule: true,
  default: () => <div data-testid="home-intro-links">HomeIntroLinks</div>
}));

describe("HomeIntroContent component test", () => {
  it("QuoteIcon, HomeIntroDescription, ApiRequestCount, HomeIntroLinks가 렌더링된다", () => {
    render(<HomeIntroContent />);
    expect(screen.getByTestId("quote-icon-top")).toBeInTheDocument();
    expect(screen.getByTestId("home-intro-description")).toBeInTheDocument();
    expect(screen.getByTestId("quote-icon-bottom")).toBeInTheDocument();
    expect(screen.getByTestId("home-intro-links")).toBeInTheDocument();
  });
});
