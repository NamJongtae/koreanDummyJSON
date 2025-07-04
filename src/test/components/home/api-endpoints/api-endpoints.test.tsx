import { render, screen } from "@testing-library/react";
import ApiEndpoints from "@/src/components/home/api-endpoints/api-endpoints";
import { API_ENDPOINT_DATA } from "@/src/table-data/api-endpoints-data";
import ApiEndPointsTable from "@/src/components/commons/api-endpoints-table";

jest.mock("@/src/components/commons/api-endpoints-table");

describe("ApiEndpoints component test", () => {
  const mockApiEndPointsTable = ApiEndPointsTable as jest.Mock;
  const mockRef = { current: null };

  beforeEach(() => {
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
});
