import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SectionNavigatorPreview from "@/src/components/commons/section-navigator/section-navigator-preview";

describe("SectionNavigatorPreview", () => {
  const sectionIds = ["section-1", "section-2", "section-3"];
  const enterNavigator = jest.fn();
  const handleClickSection = jest.fn();

  it("sectionIds 개수만큼 li가 렌더링된다", () => {
    render(
      <SectionNavigatorPreview
        sectionIds={sectionIds}
        activeSectionId={null}
        enterNavigator={enterNavigator}
        handleClickSection={handleClickSection}
      />
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(sectionIds.length);
  });

  it("activeSectionId에 따라 li의 클래스가 바뀐다", () => {
    render(
      <SectionNavigatorPreview
        sectionIds={sectionIds}
        activeSectionId={"section-2"}
        enterNavigator={enterNavigator}
        handleClickSection={handleClickSection}
      />
    );
    const items = screen.getAllByRole("listitem");
    expect(items[1]).toHaveClass("bg-blue-600");
    expect(items[0]).toHaveClass("bg-gray-300");
  });

  it("각 li 클릭 시 handleClickSection이 호출된다", () => {
    render(
      <SectionNavigatorPreview
        sectionIds={sectionIds}
        activeSectionId={null}
        enterNavigator={enterNavigator}
        handleClickSection={handleClickSection}
      />
    );
    const items = screen.getAllByRole("listitem");
    items.forEach((li, idx) => {
      fireEvent.click(li);
      expect(handleClickSection).toHaveBeenCalledWith(sectionIds[idx]);
    });
    expect(handleClickSection).toHaveBeenCalledTimes(sectionIds.length);
  });

  it("ul에서 마우스가 들어가면 enterNavigator가 호출된다", () => {
    render(
      <SectionNavigatorPreview
        sectionIds={sectionIds}
        activeSectionId={null}
        enterNavigator={enterNavigator}
        handleClickSection={handleClickSection}
      />
    );
    fireEvent.mouseEnter(screen.getByRole("list"));
    expect(enterNavigator).toHaveBeenCalled();
  });
});
