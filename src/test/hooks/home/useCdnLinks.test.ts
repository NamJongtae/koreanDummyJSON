import { renderHook, act } from "@testing-library/react";
import { useCdnLinks } from "../../../hooks/home/useCdnLinks";

const PACKAGE_NAME = "korean-dummy-json-fetcher";

describe("useCdnLinks hook test", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ version: "1.2.3" })
      })
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("초기값은 @latest 버전의 CDN 링크를 반환한다", () => {
    const { result } = renderHook(() => useCdnLinks());
    expect(result.current.jsdelivr).toContain("@latest");
    expect(result.current.unpkg).toContain("@latest");
  });

  it("최신 버전 정보를 받아오면 해당 버전의 CDN 링크를 반환한다", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ version: "1.2.3" })
    }) as unknown as typeof fetch;

    const { result } = renderHook(() => useCdnLinks());

    await act(async () => {
      await Promise.resolve();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://registry.npmjs.org/${PACKAGE_NAME}/latest`
    );
    expect(result.current.jsdelivr).toContain("@1.2.3");
    expect(result.current.unpkg).toContain("@1.2.3");
  });

  it("fetch 실패 시 fallback(@latest) 링크를 유지한다", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("Network error")) as unknown as typeof fetch;

    const { result } = renderHook(() => useCdnLinks());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.jsdelivr).toContain("@latest");
    expect(result.current.unpkg).toContain("@latest");
  });
});
