import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FetchButton from "@/src/components/commons/fetch-section/fetch-button";

describe("FetchButton component test", () => {
  it("FetchButton 버튼을 렌더링한다", () => {
    const mockFetchData = jest.fn();

    render(<FetchButton fetchData={mockFetchData} />);

    expect(screen.getByRole("button", {name: "코드 실행"})).toBeInTheDocument();
  });

  it("버튼 클릭 시 fetchData 함수가 호출된다", () => {
    const mockFetchData = jest.fn();

    render(<FetchButton fetchData={mockFetchData} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockFetchData).toHaveBeenCalledTimes(1);
  });

  it("여러 번 클릭해도 fetchData가 정상적으로 호출된다", () => {
    const mockFetchData = jest.fn();

    render(<FetchButton fetchData={mockFetchData} />);

    const button = screen.getByRole("button");

    // 3번 클릭
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockFetchData).toHaveBeenCalledTimes(3);
  });
});
