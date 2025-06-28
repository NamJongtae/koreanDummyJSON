import { render, screen } from "@testing-library/react";
import ApiRequestCount from "@/src/components/home/home-intro/api-request-count";
import useApiRequestCount from "@/src/hooks/home/useApiRequestCount";

jest.mock("@/src/hooks/home/useApiRequestCount");

describe("ApiRequestCount component test", () => {
  const mockUseApiRequestCount = useApiRequestCount as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("오늘/총 요청 카운트가 정상적으로 표시된다", () => {
    mockUseApiRequestCount.mockReturnValue({
      count: { todayCount: 12, totalCount: 345 },
      countLoading: { todayCountLoading: false, totalCountLoading: false }
    });
    render(<ApiRequestCount />);

    expect(
      screen.getByText("오늘의 API 요청 횟수 :", { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText("12번")).toBeInTheDocument();
    expect(
      screen.getByText("총 API 요청 횟수 :", { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText("345번")).toBeInTheDocument();
  });

  it("로딩 중이면 스켈레톤이 표시된다", () => {
    mockUseApiRequestCount.mockReturnValue({
      count: { todayCount: 0, totalCount: 0 },
      countLoading: { todayCountLoading: true, totalCountLoading: true }
    });
    render(<ApiRequestCount />);

    const skeletons = screen.getAllByText((content, element) => {
      return element!.className.includes("animate-pulse");
    });
    expect(skeletons.length).toBeGreaterThanOrEqual(2);
  });

  it("카운트 값이 0이면 0번으로 표시된다", () => {
    mockUseApiRequestCount.mockReturnValue({
      count: { todayCount: 0, totalCount: 0 },
      countLoading: { todayCountLoading: false, totalCountLoading: false }
    });
    render(<ApiRequestCount />);
    // 오늘 요청 횟수, 총 요청 횟수
    const countSpans = screen.getAllByText("0번");
    expect(countSpans.length).toBeGreaterThanOrEqual(2);
    countSpans.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });
});
