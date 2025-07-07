"use client";

import SectionNavigator from "@/src/components/commons/section-navigator/section-navigator";
import DeleteResource from "@/src/components/guide/delete-resource";
import FilterResources from "@/src/components/guide/filter-resource";
import GetResource from "@/src/components/guide/get-resource";
import GetResourcesPaging from "@/src/components/guide/get-resource-paging";
import GetResources from "@/src/components/guide/get-resources";
import GuideIntro from "@/src/components/guide/guide-intro";
import NestedResources from "@/src/components/guide/nested-resource";
import PatchResource from "@/src/components/guide/patch-resource";
import PostResource from "@/src/components/guide/post-resource";
import PutResource from "@/src/components/guide/put-resource";
import useSectionNavigatorScroller from "@/src/hooks/commons/useSectionNavigatorScroller";
import StartLibrary from "./start-library/start-library";

export default function GuidePage() {
  const { activeSectionId } = useSectionNavigatorScroller();

  return (
    <div className="md:pl-6 md:pr-12">
      <GuideIntro />
      <GetResource />
      <GetResources />
      <GetResourcesPaging />
      <PostResource />
      <PutResource />
      <PatchResource />
      <DeleteResource />
      <FilterResources />
      <NestedResources />
      <StartLibrary />
      <SectionNavigator
        activeSectionId={activeSectionId}
        sectionIds={[
          "소개",
          "Resource-조회하기",
          "Resource-목록-조회하기",
          "Resource-목록-페이징",
          "Resource-생성하기",
          "Resource-전체-수정하기",
          "Resource-일부-수정하기",
          "Resource-삭제하기",
          "Resource-필터링하기",
          "하위-중첩-Resource-조회하기",
          "라이브러리로-빠르게-시작하기"
        ]}
      />
    </div>
  );
}
