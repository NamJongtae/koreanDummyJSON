import { renderHook, act } from "@testing-library/react";
import useFetch from "../../../hooks/commons/useFetch";

describe("useFetch hook test", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("fetchData를 호출하면 isLoading이 true로 바뀌고, 데이터가 성공적으로 반환된다", async () => {
    const mockData = { message: "success" };
    global.fetch = jest.mocked(
      jest.fn().mockResolvedValue({
        json: async () => mockData
      })
    );

    const { result } = renderHook(() => useFetch());

    await act(async () => {
      result.current.fetchData("/api/test");
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({ method: "GET" })
    );
  });

  it("fetchData를 호출하면 실패 시 에러가 콘솔에 찍히고, isLoading이 false로 바뀐다", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    global.fetch = jest.mocked(jest.fn().mockRejectedValue(new Error("fail")));

    const { result } = renderHook(() => useFetch());

    await act(async () => {
      result.current.fetchData("/api/fail");
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching data:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  it("fetchData를 호출할 때 method, headers, body, cache 옵션이 올바르게 적용된다", async () => {
    const mockData = { message: "ok" };
    const fetchMock = jest.fn().mockResolvedValue({
      json: async () => mockData
    });
    global.fetch = fetchMock;

    const { result } = renderHook(() => useFetch());

    // POST 요청
    await act(async () => {
      result.current.fetchData(
        "/api/post",
        "POST",
        { foo: "bar" },
        { Authorization: "Bearer token" }
      );
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/post",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ foo: "bar" }),
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer token"
        })
        // POST일 때는 cache 옵션이 없어야 함
      })
    );

    // GET 요청
    await act(async () => {
      result.current.fetchData("/api/get", "GET", undefined, { "X-Test": "1" });
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/get",
      expect.objectContaining({
        method: "GET",
        body: null,
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "X-Test": "1"
        }),
        cache: "force-cache"
      })
    );
  });
});
