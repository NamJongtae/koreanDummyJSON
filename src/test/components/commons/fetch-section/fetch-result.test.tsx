import React from "react";
import { render, screen } from "@testing-library/react";
import FetchResult from "@/src/components/commons/fetch-section/fetch-result";
import { DummyDataResonses } from "@/src/types/response-type";

jest.mock("@/src/components/commons/fetch-section/loading-indicator", () => {
  return function MockLoadingIndicator({ isLoading }: { isLoading: boolean }) {
    return (
      <div data-testid="loading-indicator" data-is-loading={isLoading}>
        {isLoading ? "Loading..." : "Not Loading"}
      </div>
    );
  };
});
jest.mock("@/src/components/commons/fetch-section/json-display", () => {
  return function MockJsonDisplay({ data }: { data: DummyDataResonses }) {
    return (
      <div data-testid="json-display" data-testid-data={JSON.stringify(data)}>
        JSON Display: {JSON.stringify(data)}
      </div>
    );
  };
});

describe("FetchResult component test", () => {
  const mockData: DummyDataResonses = {
    user: {
      id: 1,
      username: "test",
      email: "test@example.com",
      phone: "010-1234-5678",
      address: "123 Main St, Anytown, USA",
      createdAt: new Date().toISOString()
    },
    message: "유저 조회 성공"
  };

  it("FetchResult 컴포넌트를 렌더링한다", () => {
    render(<FetchResult data={mockData} isLoading={false} />);

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    expect(screen.getByTestId("json-display")).toBeInTheDocument();
    expect(
      screen.getByTestId("loading-indicator").parentElement
    ).toBeInTheDocument();
  });

  it("LoadingIndicator에 props가 올바르게 전달된다", () => {
    render(<FetchResult data={mockData} isLoading={true} />);

    const loadingIndicator = screen.getByTestId("loading-indicator");
    expect(loadingIndicator).toHaveAttribute("data-is-loading", "true");
    expect(loadingIndicator).toHaveTextContent("Loading...");
  });

  it("JsonDisplay에 props가 올바르게 전달된다", () => {
    render(<FetchResult data={mockData} isLoading={false} />);

    const jsonDisplay = screen.getByTestId("json-display");
    expect(jsonDisplay).toHaveAttribute(
      "data-testid-data",
      JSON.stringify(mockData)
    );
    expect(jsonDisplay).toHaveTextContent(
      `JSON Display: ${JSON.stringify(mockData)}`
    );
  });
});
