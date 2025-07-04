import { render, screen } from "@testing-library/react";
import StartGuide from "@/src/components/home/start-guide/start-guide";

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
  it("섹션, 제목, NpmCdnGuide, GuidePageIntro, DocsPageIntro가 모두 렌더링된다", () => {
    render(<StartGuide />);
    expect(
      screen.getByRole("heading", { name: "빠른 시작 가이드" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-npm-cdn-guide")).toBeInTheDocument();
    expect(screen.getByTestId("mock-guide-page-intro")).toBeInTheDocument();
    expect(screen.getByTestId("mock-docs-page-intro")).toBeInTheDocument();
  });
});
