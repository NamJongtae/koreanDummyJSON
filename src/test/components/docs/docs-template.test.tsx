import React from "react";
import { render, screen } from "@testing-library/react";
import DocsTemplate from "@/src/components/docs/docs-template";
import SectionNavigator from "@/src/components/commons/section-navigator/section-navigator";
import DocsTitle from "@/src/components/docs/docs-title";
import DocsIntro from "@/src/components/docs/docs-intro";
import useSectionNavigatorScroller from "@/src/hooks/commons/useSectionNavigatorScroller";

jest.mock("@/src/components/commons/section-navigator/section-navigator");
jest.mock("@/src/components/docs/docs-title");
jest.mock("@/src/components/docs/docs-intro");
jest.mock("@/src/hooks/commons/useSectionNavigatorScroller");

describe("DocsTemplate component test", () => {
  const mockSectionNavigator = SectionNavigator as jest.Mock;
  const mockDocsTitle = DocsTitle as jest.Mock;
  const mockDocsIntro = DocsIntro as jest.Mock;
  const mockUseSectionNavigatorScroller =
    useSectionNavigatorScroller as jest.Mock;

  const DummySection = () => (
    <section data-testid="dummy-section">SectionContent</section>
  );
  const activeSectionId = "소개";
  const sectionIds = ["소개", "유저-조회하기", "유저-목록-조회하기"];

  beforeEach(() => {
    jest.clearAllMocks();
    mockSectionNavigator.mockImplementation(() => (
      <nav data-testid="section-navigator">SectionNavigator</nav>
    ));
    mockDocsTitle.mockImplementation(() => (
      <h1 data-testid="docs-title">DocsTitle</h1>
    ));
    mockDocsIntro.mockImplementation(() => (
      <p data-testid="docs-intro">DocsIntro</p>
    ));
    mockUseSectionNavigatorScroller.mockImplementation(() => ({
      activeSectionId
    }));
  });

  it("DocsTitle, DocsIntro, SectionComponents, SectionNavigator  컴포넌트가 정상적으로 렌더링된다", () => {
    render(
      <DocsTemplate
        SectionComponents={<DummySection />}
        sectionIds={sectionIds}
      />
    );
    expect(screen.getByTestId("docs-title")).toBeInTheDocument();
    expect(screen.getByTestId("docs-intro")).toBeInTheDocument();
    expect(screen.getByTestId("dummy-section")).toBeInTheDocument();
    expect(screen.getByTestId("section-navigator")).toBeInTheDocument();
  });

  it("SectionNavigator에 sectionIds와 activeSectionId가 올바르게 전달된다", () => {
    render(
      <DocsTemplate
        SectionComponents={<DummySection />}
        sectionIds={sectionIds}
      />
    );
    expect(mockSectionNavigator).toHaveBeenCalled();
    const props = mockSectionNavigator.mock.calls[0][0];
    expect(props).toMatchObject({
      activeSectionId,
      sectionIds
    });
  });
});
