import React from "react";
import { render, screen } from "@testing-library/react";
import GuidePage from "@/src/components/guide/guide-page";

import GuideIntro from "@/src/components/guide/guide-intro";
import GetResource from "@/src/components/guide/get-resource";
import GetResources from "@/src/components/guide/get-resources";
import GetResourcesPaging from "@/src/components/guide/get-resource-paging";
import PostResource from "@/src/components/guide/post-resource";
import PutResource from "@/src/components/guide/put-resource";
import PatchResource from "@/src/components/guide/patch-resource";
import DeleteResource from "@/src/components/guide/delete-resource";
import FilterResources from "@/src/components/guide/filter-resource";
import NestedResources from "@/src/components/guide/nested-resource";
import SectionNavigator from "@/src/components/commons/section-navigator/section-navigator";

jest.mock("react-syntax-highlighter", () => ({
  Prism: ({ children }: { children: React.ReactNode }) => <pre>{children}</pre>
}));
jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
  materialDark: {}
}));
jest.mock("@/src/components/guide/guide-intro");
jest.mock("@/src/components/guide/get-resource");
jest.mock("@/src/components/guide/get-resources");
jest.mock("@/src/components/guide/get-resource-paging");
jest.mock("@/src/components/guide/post-resource");
jest.mock("@/src/components/guide/put-resource");
jest.mock("@/src/components/guide/patch-resource");
jest.mock("@/src/components/guide/delete-resource");
jest.mock("@/src/components/guide/filter-resource");
jest.mock("@/src/components/guide/nested-resource");
jest.mock("@/src/components/commons/section-navigator/section-navigator");
jest.mock("@/src/hooks/commons/useSectionNavigatorScroller", () => () => ({
  activeSectionId: "소개"
}));

const mockGuideIntro = GuideIntro as jest.Mock;
const mockGetResource = GetResource as jest.Mock;
const mockGetResources = GetResources as jest.Mock;
const mockGetResourcesPaging = GetResourcesPaging as jest.Mock;
const mockPostResource = PostResource as jest.Mock;
const mockPutResource = PutResource as jest.Mock;
const mockPatchResource = PatchResource as jest.Mock;
const mockDeleteResource = DeleteResource as jest.Mock;
const mockFilterResources = FilterResources as jest.Mock;
const mockNestedResources = NestedResources as jest.Mock;
const mockSectionNavigator = SectionNavigator as jest.Mock;

beforeEach(() => {
  mockGuideIntro.mockImplementation(() => (
    <section id="소개">
      <h2>소개</h2>
    </section>
  ));
  mockGetResource.mockImplementation(() => (
    <section id="Resource-조회하기">
      <h2>Resource 조회하기</h2>
    </section>
  ));
  mockGetResources.mockImplementation(() => (
    <section id="Resource-목록-조회하기">
      <h2>Resource 목록 조회하기</h2>
    </section>
  ));
  mockGetResourcesPaging.mockImplementation(() => (
    <section id="Resource-목록-페이징">
      <h2>Resource 목록 페이징</h2>
    </section>
  ));
  mockPostResource.mockImplementation(() => (
    <section id="Resource-생성하기">
      <h2>Resource 생성하기</h2>
    </section>
  ));
  mockPutResource.mockImplementation(() => (
    <section id="Resource-전체-수정하기">
      <h2>Resource 전체 수정하기</h2>
    </section>
  ));
  mockPatchResource.mockImplementation(() => (
    <section id="Resource-일부-수정하기">
      <h2>Resource 일부 수정하기</h2>
    </section>
  ));
  mockDeleteResource.mockImplementation(() => (
    <section id="Resource-삭제하기">
      <h2>Resource 삭제하기</h2>
    </section>
  ));
  mockFilterResources.mockImplementation(() => (
    <section id="Resource-필터링하기">
      <h2>Resource 필터링하기</h2>
    </section>
  ));
  mockNestedResources.mockImplementation(() => (
    <section id="하위-Resource-조회하기">
      <h2>하위 Resource 조회하기</h2>
    </section>
  ));
  mockSectionNavigator.mockImplementation(() => (
    <div data-testid="section-navigator" />
  ));
});

describe("GuidePage component test", () => {
  it("모든 주요 섹션 컴포넌트가 렌더링된다.", () => {
    render(<GuidePage />);
    expect(screen.getByRole("heading", { name: "소개" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Resource 조회하기" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Resource 목록 조회하기" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Resource 목록 페이징" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Resource 생성하기" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Resource 전체 수정하기" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Resource 일부 수정하기" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Resource 삭제하기" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Resource 필터링하기" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "하위 Resource 조회하기" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("section-navigator")).toBeInTheDocument();
  });

  it("SectionNavigator에 올바른 props가 전달되는지 확인", () => {
    render(<GuidePage />);
    const props = mockSectionNavigator.mock.calls[0][0];
    expect(props.sectionIds).toEqual([
      "소개",
      "Resource-조회하기",
      "Resource-목록-조회하기",
      "Resource-목록-페이징",
      "Resource-생성하기",
      "Resource-전체-수정하기",
      "Resource-일부-수정하기",
      "Resource-삭제하기",
      "Resource-필터링하기",
      "하위-Resource-조회하기"
    ]);
    expect(props.activeSectionId).toBe("소개");
  });
});
