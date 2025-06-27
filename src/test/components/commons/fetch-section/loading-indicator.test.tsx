import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingIndicator from "@/src/components/commons/fetch-section/loading-indicator";

describe("LoadingIndicator component test", () => {
  it("isLoading이 true일 때 오버레이와 텍스트가 렌더링된다", () => {
    render(<LoadingIndicator isLoading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(document.querySelector(".bg-black.opacity-50")).toBeInTheDocument();
  });

  it("isLoading이 false일 때 아무것도 렌더링되지 않는다", () => {
    const { container } = render(<LoadingIndicator isLoading={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});
