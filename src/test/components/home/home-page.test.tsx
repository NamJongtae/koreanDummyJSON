import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "@/src/components/home/home-page";
import HomeIntro from "@/src/components/home/home-intro/home-intro";
import TryIt from "@/src/components/home/try-it/try-it";
import Resources from "@/src/components/home/resources/resources";
import ApiEndpoints from "@/src/components/home/api-endpoints/api-endpoints";
import StartGuide from "@/src/components/home/start-guide/start-guide";
import SectionNavigator from "@/src/components/commons/section-navigator/section-navigator";

jest.mock("react-syntax-highlighter", () => ({
  Prism: ({ children }: { children: React.ReactNode }) => <pre>{children}</pre>
}));
jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
  materialDark: {}
}));
jest.mock("@/src/components/home/home-intro/home-intro");
jest.mock("@/src/components/home/try-it/try-it");
jest.mock("@/src/components/home/resources/resources");
jest.mock("@/src/components/home/api-endpoints/api-endpoints");
jest.mock("@/src/components/home/start-guide/start-guide");
jest.mock("@/src/components/commons/section-navigator/section-navigator");
jest.mock("@/src/hooks/commons/useSectionNavigatorScroller", () => () => ({
  activeSectionId: "소개"
}));

const mockHomeIntro = HomeIntro as jest.Mock;
const mockTryIt = TryIt as jest.Mock;
const mockResources = Resources as jest.Mock;
const mockApiEndpoints = ApiEndpoints as jest.Mock;
const mockStartGuide = StartGuide as jest.Mock;
const mockSectionNavigator = SectionNavigator as jest.Mock;

beforeEach(() => {
  mockHomeIntro.mockImplementation(() => (
    <section id="소개">
      <h2>Korean Dummy Json</h2>
    </section>
  ));
  mockTryIt.mockImplementation(() => (
    <section id="직접-테스트-해보세요">
      <h2>직접-테스트-해보세요</h2>
    </section>
  ));
  mockResources.mockImplementation(() => (
    <section id="Resources">
      <h2>Resources</h2>
    </section>
  ));
  mockApiEndpoints.mockImplementation(() => (
    <section id="API-Endpoints">
      <h2>API-Endpoints</h2>
    </section>
  ));
  mockStartGuide.mockImplementation(() => (
    <section id="빠른-시작-가이드">
      <h2>빠른-시작-가이드</h2>
    </section>
  ));
  mockSectionNavigator.mockImplementation(() => (
    <div>
      <div>소개</div>
      <div>직접-테스트-해보세요</div>
      <div>Resources</div>
      <div>API-Endpoints</div>
      <div>빠른-시작-가이드</div>
    </div>
  ));
});

describe("HomePage component test", () => {
  it("모든 컴포넌트가 렌더링된다.", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "Korean Dummy Json" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "직접-테스트-해보세요" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Resources" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "API-Endpoints" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "빠른-시작-가이드" })
    ).toBeInTheDocument();
  });

  it("SectionNavigator에 올바른 props가 전달되는지 확인", () => {
    render(<HomePage />);
    const props = mockSectionNavigator.mock.calls[0][0];
    expect(props.sectionIds).toEqual([
      "소개",
      "직접-테스트-해보세요",
      "Resources",
      "API-Endpoints",
      "빠른-시작-가이드"
    ]);
    expect(props.activeSectionId).toBe("소개");
  });
});
