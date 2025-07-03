"use client";

import HomeIntro from "@/src/components/home/home-intro/home-intro";
import TryIt from "@/src/components/home/try-it/try-it";
import Resources from "@/src/components/home/resources/resources";
import ApiEndpoints from "@/src/components/home/api-endpoints/api-endpoints";
import StartGuide from "@/src/components/home/start-guide/start-guide";
import SectionNavigator from "@/src/components/commons/section-navigator/section-navigator";
import useSectionNavigatorScroller from "@/src/hooks/commons/useSectionNavigatorScroller";

export default function HomePage() {
  const { activeSectionId } = useSectionNavigatorScroller();

  return (
    <div className="md:pl-6 md:pr-12">
      <HomeIntro />
      <TryIt />
      <Resources />
      <ApiEndpoints />
      <StartGuide />
      <SectionNavigator
        activeSectionId={activeSectionId}
        sectionIds={[
          "소개",
          "직접-테스트-해보세요",
          "Resources",
          "API-Endpoints",
          "빠른-시작-가이드"
        ]}
      />
    </div>
  );
}
