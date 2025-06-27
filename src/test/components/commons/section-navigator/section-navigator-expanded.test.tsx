import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SectionNavigatorExpanded from "@/src/components/commons/section-navigator/section-navigator-expaned";

describe("SectionNavigatorExpanded", () => {
  const sectionIds = ["section-1", "section-2", "section-3"];
  const navigatorRef = {
    current: null
  } as React.MutableRefObject<HTMLUListElement | null>;
  const leaveNavigator = jest.fn();
  const handleClickSection = jest.fn();

  it("sectionIds 개수만큼 li가 렌더링된다", () => {
    render(
      <SectionNavigatorExpanded
        sectionIds={sectionIds}
        activeSectionId={null}
        navigatorRef={navigatorRef}
        leaveNavigator={leaveNavigator}
        handleClickSection={handleClickSection}
      />
    );
    sectionIds.forEach((id) => {
      expect(screen.getByText(id.replaceAll("-", " "))).toBeInTheDocument();
    });
  });

  it("activeSectionId에 따라 스타일이 바뀐다", () => {
    render(
      <SectionNavigatorExpanded
        sectionIds={sectionIds}
        activeSectionId={"section-2"}
        navigatorRef={navigatorRef}
        leaveNavigator={leaveNavigator}
        handleClickSection={handleClickSection}
      />
    );
    const active = screen.getByText("section 2");
    expect(active).toHaveClass("text-blue-600");
    const inactive = screen.getByText("section 1");
    expect(inactive).toHaveClass("text-black");
  });

  it("각 li 클릭 시 handleClickSection이 호출된다", () => {
    render(
      <SectionNavigatorExpanded
        sectionIds={sectionIds}
        activeSectionId={null}
        navigatorRef={navigatorRef}
        leaveNavigator={leaveNavigator}
        handleClickSection={handleClickSection}
      />
    );
    sectionIds.forEach((id) => {
      fireEvent.click(screen.getByText(id.replaceAll("-", " ")));
      expect(handleClickSection).toHaveBeenCalledWith(id);
    });
    expect(handleClickSection).toHaveBeenCalledTimes(sectionIds.length);
  });

  it("ul에서 마우스가 떠나면 leaveNavigator가 호출된다", () => {
    render(
      <SectionNavigatorExpanded
        sectionIds={sectionIds}
        activeSectionId={null}
        navigatorRef={navigatorRef}
        leaveNavigator={leaveNavigator}
        handleClickSection={handleClickSection}
      />
    );
    fireEvent.mouseLeave(screen.getByRole("list"));
    expect(leaveNavigator).toHaveBeenCalled();
  });
});
