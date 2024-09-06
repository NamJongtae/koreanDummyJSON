"use client";

import useSectionNavigator from "@/src/hooks/commons/useSectionNavigator";
import SectionNavigatorExpanded from "./section-navigator-expaned";
import SectionNavigatorPreview from "./section-navigator-preview";

interface IProps {
  activeSectionId: string | null;
  sectionIds: string[];
}

export default function SectionNavigator({
  activeSectionId,
  sectionIds
}: IProps) {
  const {
    hovered,
    navigatorRef,
    enterNavigator,
    leaveNavigator,
    handleClickSection
  } = useSectionNavigator();

  return (
    <aside className="fixed top-52 p-5 right-2 hidden md:block">
      {hovered ? (
        <SectionNavigatorExpanded
          sectionIds={sectionIds}
          activeSectionId={activeSectionId}
          navigatorRef={navigatorRef}
          leaveNavigator={leaveNavigator}
          handleClickSection={handleClickSection}
        />
      ) : (
        <SectionNavigatorPreview
          sectionIds={sectionIds}
          activeSectionId={activeSectionId}
          enterNavigator={enterNavigator}
          handleClickSection={handleClickSection}
        />
      )}
    </aside>
  );
}
