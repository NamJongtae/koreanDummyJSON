import { render, screen } from "@testing-library/react";
import ApiEndpoints from "@/src/components/home/api-endpoints/api-endpoints";
import { useSectionVisibility } from "@/src/hooks/commons/useSectionVisibility";
import { API_ENDPOINT_DATA } from "@/src/table-data/api-endpoints-data";
import ApiEndPointsTable from "@/src/components/commons/api-endpoints-table";

jest.mock("@/src/hooks/commons/useSectionVisibility", () => ({
  useSectionVisibility: jest.fn()
}));
jest.mock("@/src/components/commons/api-endpoints-table");

describe("ApiEndpoints component test", () => {
  const mockApiEndPointsTable = ApiEndPointsTable as jest.Mock;
  const mockUseSectionVisibility = useSectionVisibility as jest.Mock;
  const mockRef = { current: null };

  beforeEach(() => {
    mockUseSectionVisibility.mockImplementation(() => ({
      ref: mockRef,
      isVisible: true
    }));
    mockApiEndPointsTable.mockImplementation(
      (props: Record<string, unknown>) => (
        <div data-testid="mock-api-endpoints-table" {...props} />
      )
    );
  });

  it("섹션, 제목, ApiEndPointsTable이 렌더링된다", () => {
    render(<ApiEndpoints />);
    expect(
      screen.getByRole("heading", { name: "API Endpoints" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-api-endpoints-table")).toBeInTheDocument();
  });

  it("ApiEndPointsTable에 API_ENDPOINT_DATA가 올바르게 전달된다", () => {
    render(<ApiEndpoints />);
    const props = mockApiEndPointsTable.mock.calls[0][0];
    expect(props).toHaveProperty("data", API_ENDPOINT_DATA);
  });

  it("isVisible 값에 따라 opacity/translate 클래스가 올바르게 적용된다", () => {
    // isVisible: false
    mockUseSectionVisibility.mockImplementation(() => ({
      ref: mockRef,
      isVisible: false
    }));
    const { container, rerender } = render(<ApiEndpoints />);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("opacity-0");
    expect(section.className).toContain("translate-y-[150px]");

    // isVisible: true
    mockUseSectionVisibility.mockImplementation(() => ({
      ref: mockRef,
      isVisible: true
    }));
    rerender(<ApiEndpoints />);
    expect(section.className).toContain("opacity-100");
    expect(section.className).toContain("translate-y-0");
  });

  it("section 태그에 useSectionVisibility의 ref가 전달되는지 확인한다", () => {
    mockUseSectionVisibility.mockImplementation(() => ({
      ref: mockRef,
      isVisible: true
    }));
    const { container } = render(<ApiEndpoints />);
    const section = container.querySelector("section");
    expect(mockRef.current).toBe(section);
  });
});
