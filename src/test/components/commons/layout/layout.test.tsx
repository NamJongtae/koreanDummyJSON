import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "@/src/components/commons/layout/layout";

// 하위 컴포넌트 mock
jest.mock("@/src/components/commons/layout/header", () => {
  const MockHeader = () => (
    <header data-testid="mock-header">MockHeader</header>
  );
  MockHeader.displayName = "MockHeader";
  return MockHeader;
});
jest.mock("@/src/components/commons/layout/footer", () => {
  const MockFooter = () => (
    <footer data-testid="mock-footer">MockFooter</footer>
  );
  MockFooter.displayName = "MockFooter";
  return MockFooter;
});
jest.mock("@/src/components/commons/layout/mobile-nav/mobile-nav", () => {
  const MockMobileNav = () => (
    <nav data-testid="mock-mobile-nav">MockMobileNav</nav>
  );
  MockMobileNav.displayName = "MockMobileNav";
  return MockMobileNav;
});
jest.mock("@/src/components/commons/top-btn", () => {
  const MockTopBtn = () => (
    <button data-testid="mock-top-btn">MockTopBtn</button>
  );
  MockTopBtn.displayName = "MockTopBtn";
  return MockTopBtn;
});
jest.mock("@/src/store/mobile-nav-provider", () => {
  const MockProvider = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-provider">{children}</div>
  );
  MockProvider.displayName = "MockProvider";
  return MockProvider;
});

describe("Layout component test", () => {
  it("Header, MobileNav, TopBtn, Footer, children이 정상적으로 렌더링된다", () => {
    render(
      <Layout>
        <main>테스트 children</main>
      </Layout>
    );
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-mobile-nav")).toBeInTheDocument();
    expect(screen.getByTestId("mock-top-btn")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
    expect(screen.getByText("테스트 children")).toBeInTheDocument();
  });
});
