import React from "react";
import { render, screen } from "@testing-library/react";
import FetchSection from "@/src/components/commons/fetch-section/fetch-section";

jest.mock("@/src/hooks/commons/useFetch", () => () => ({
  data: "mock data",
  fetchData: jest.fn(),
  isLoading: false
}));
jest.mock("@/src/lib/generateCodeSnippet", () => ({
  generateCodeSnippet: () => "console.log('mock code');"
}));
jest.mock("@/src/components/commons/fetch-section/fetch-button", () => {
  const MockFetchButton = () => <button>Fetch</button>;
  MockFetchButton.displayName = "FetchButton";
  return MockFetchButton;
});
jest.mock("@/src/components/commons/fetch-section/copy-btn", () => {
  const MockCopyBtn = () => <button>Copy</button>;
  MockCopyBtn.displayName = "CopyBtn";
  return MockCopyBtn;
});
jest.mock("@/src/components/commons/fetch-section/fetch-result", () => {
  const MockFetchResult = ({ data, isLoading }: any) => (
    <div>Result: {data}</div>
  );
  MockFetchResult.displayName = "FetchResult";
  return MockFetchResult;
});
jest.mock("@/src/components/commons/fetch-section/code-snippet", () => {
  const MockCodeSnippet = ({ code }: any) => <pre>{code}</pre>;
  MockCodeSnippet.displayName = "CodeSnippet";
  return MockCodeSnippet;
});

describe("FetchSection component test", () => {
  it("필수 props 전달 시 주요 UI가 정상적으로 렌더링된다", () => {
    render(
      <FetchSection
        title="테스트 타이틀"
        endpoint="/api/test"
        method="GET"
        descriptions={<div>설명입니다</div>}
        fetchUrl="/test"
      />
    );

    expect(screen.getByText("테스트 타이틀")).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, node) => node?.textContent === "Endpoint : /api/test"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, node) => node?.textContent === "Method : GET")
    ).toBeInTheDocument();
    expect(screen.getByText("설명입니다")).toBeInTheDocument();
    expect(screen.getByText("console.log('mock code');")).toBeInTheDocument();
    expect(screen.getByText("Fetch")).toBeInTheDocument();
    expect(screen.getByText("Copy")).toBeInTheDocument();
    expect(screen.getByText("Result: mock data")).toBeInTheDocument();
  });
});
