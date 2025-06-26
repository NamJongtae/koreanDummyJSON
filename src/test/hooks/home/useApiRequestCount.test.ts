import { renderHook, waitFor, act } from "@testing-library/react";
import useApiRequestCount from "../../../hooks/home/useApiRequestCount";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ count: 0 })
  })
) as jest.Mock;

describe("useApiRequestCount hook test", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("초기 count와 countLoading 값이 0과 false여야 한다", async () => {
    let result: any;
    await act(async () => {
      result = renderHook(() => useApiRequestCount());
    });
    expect(result.result.current.count).toEqual({
      todayCount: 0,
      totalCount: 0
    });
    expect(result.result.current.countLoading).toEqual({
      todayCountLoading: false,
      totalCountLoading: false
    });
  });

  it("todayCount와 totalCount가 fetch되어 상태가 업데이트된다", async () => {
    const todayCountValue = 123;
    const totalCountValue = 456;
    let fetchCall = 0;
    global.fetch = jest.fn().mockImplementation((url) => {
      fetchCall++;
      if (url.toString().includes("date=")) {
        return Promise.resolve({
          json: async () => ({ count: todayCountValue })
        });
      }
      return Promise.resolve({
        json: async () => ({ count: totalCountValue })
      });
    });

    let result: any;
    await act(async () => {
      result = renderHook(() => useApiRequestCount());
    });

    await waitFor(() => {
      expect(result.result.current.count.todayCount).toBe(todayCountValue);
    });
    await waitFor(() => {
      expect(result.result.current.count.totalCount).toBe(totalCountValue);
    });

    await waitFor(() =>
      expect(result.result.current.countLoading).toEqual({
        todayCountLoading: false,
        totalCountLoading: false
      })
    );
    expect(fetchCall).toBe(2);
  });
});
