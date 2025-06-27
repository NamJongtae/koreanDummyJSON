import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GenerateImageBtn from "@/src/components/commons/generate-image-section/generate-image-btn";

describe("GenerateImageBtn", () => {
  it("버튼이 정상적으로 렌더링된다", () => {
    render(<GenerateImageBtn generateImage={jest.fn()} />);
    expect(
      screen.getByRole("button", { name: "이미지 생성" })
    ).toBeInTheDocument();
  });

  it("버튼 클릭 시 generateImage 함수가 호출된다", () => {
    const mockFn = jest.fn();
    render(<GenerateImageBtn generateImage={mockFn} />);
    fireEvent.click(screen.getByRole("button", { name: "이미지 생성" }));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
