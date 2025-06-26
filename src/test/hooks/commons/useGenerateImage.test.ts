import { renderHook, act } from "@testing-library/react";
import useGenerateImage from "../../../hooks/commons/useGenerateImage";

describe("useGenerateImage hook test", () => {
  it("초기값이 올바르게 반환된다", () => {
    const { result } = renderHook(() => useGenerateImage());
    expect(result.current.generateImage).toBe(false);
    expect(typeof result.current.handleClickGenerateImage).toBe("function");
  });

  it("handleClickGenerateImage를 호출하면 generateImage가 true가 된다", () => {
    const { result } = renderHook(() => useGenerateImage());
    act(() => {
      result.current.handleClickGenerateImage();
    });
    expect(result.current.generateImage).toBe(true);
  });
});
