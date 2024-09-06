"use client";

import SectionNavigator from "@/src/components/commons/section-navigator/section-navigator";
import useSectionNavigatorScroller from "@/src/hooks/commons/useSectionNavigatorScroller";
import DocsTitle from "@/src/components/docs/docs-title";
import DocsIntro from "@/src/components/docs/docs-intro";

interface IProps {
  SectionComponents: React.ReactNode;
  sectionIds: string[];
}

export default function DocsTemplate({
  SectionComponents,
  sectionIds
}: IProps) {
  const { activeSectionId } = useSectionNavigatorScroller();

  return (
    <div className="md:pl-6 md:pr-12">
      <DocsTitle />
      <DocsIntro />
      {SectionComponents}
      <SectionNavigator
        activeSectionId={activeSectionId}
        sectionIds={sectionIds}
      />
    </div>
  );
}
