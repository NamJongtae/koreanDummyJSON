import React from "react";
import { render, screen } from "@testing-library/react";
import SectionNavigator from "@/src/components/commons/section-navigator/section-navigator";
import useSectionNavigator from "@/src/hooks/commons/useSectionNavigator";

jest.mock("@/src/hooks/commons/useSectionNavigator");
jest.mock(
  "@/src/components/commons/section-navigator/section-navigator-expaned",
  () => {
    const MockSectionNavigatorExpanded = (props: unknown) => (
      <div data-testid="expanded">Expanded {JSON.stringify(props)}</div>
    );
    MockSectionNavigatorExpanded.displayName = "MockSectionNavigatorExpanded";
    return MockSectionNavigatorExpanded;
  }
);
jest.mock(
  "@/src/components/commons/section-navigator/section-navigator-preview",
  () => {
    const MockSectionNavigatorPreview = (props: unknown) => (
      <div data-testid="preview">Preview {JSON.stringify(props)}</div>
    );
    MockSectionNavigatorPreview.displayName = "MockSectionNavigatorPreview";
    return MockSectionNavigatorPreview;
  }
);

const sectionIds = ["section-1", "section-2"];
const activeSectionId = "section-1";

const mockNavigatorRef = { current: null };
const mockEnterNavigator = jest.fn();
const mockLeaveNavigator = jest.fn();
const mockHandleClickSection = jest.fn();

describe("SectionNavigator component test", () => {
  const mockUseSectionNavigator = useSectionNavigator as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("hovered가 true면 SectionNavigatorExpanded가 렌더링된다", () => {
    mockUseSectionNavigator.mockReturnValue({
      hovered: true,
      navigatorRef: mockNavigatorRef,
      enterNavigator: mockEnterNavigator,
      leaveNavigator: mockLeaveNavigator,
      handleClickSection: mockHandleClickSection
    });
    render(
      <SectionNavigator
        sectionIds={sectionIds}
        activeSectionId={activeSectionId}
      />
    );
    expect(screen.getByTestId("expanded")).toBeInTheDocument();
    expect(screen.queryByTestId("preview")).not.toBeInTheDocument();
  });

  it("hovered가 false면 SectionNavigatorPreview가 렌더링된다", () => {
    mockUseSectionNavigator.mockReturnValue({
      hovered: false,
      navigatorRef: mockNavigatorRef,
      enterNavigator: mockEnterNavigator,
      leaveNavigator: mockLeaveNavigator,
      handleClickSection: mockHandleClickSection
    });
    render(
      <SectionNavigator
        sectionIds={sectionIds}
        activeSectionId={activeSectionId}
      />
    );
    expect(screen.getByTestId("preview")).toBeInTheDocument();
    expect(screen.queryByTestId("expanded")).not.toBeInTheDocument();
  });
});
