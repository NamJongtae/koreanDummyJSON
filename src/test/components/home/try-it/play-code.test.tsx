import { render, screen, fireEvent } from "@testing-library/react";
import PlayCode from "@/src/components/home/try-it/play-code";
import { DummyDataResonses } from "@/src/types/response-type";
import useEndpointMenu from "@/src/hooks/home/useEndpointMenu";
import useFetch from "@/src/hooks/commons/useFetch";

const mockEndpointMenuDefault = {
  ENDPOINTS: ["users", "posts"],
  endpoint: "users",
  code: "fetch code",
  isOpenEndpointMenu: false,
  endpointMenuRef: { current: null },
  toggleEndpointMenu: jest.fn(),
  selectEndpoint: jest.fn()
};
const mockFetchDefault = {
  data: { test: "test" },
  isLoading: false,
  fetchData: jest.fn()
};
const mockEndpointMenuProps = jest.fn();

jest.mock("@/src/hooks/home/useEndpointMenu");
jest.mock("@/src/hooks/commons/useFetch");
jest.mock("@/src/components/home/try-it/endpoint-menu", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    mockEndpointMenuProps(props);
    return <div data-testid="endpoint-menu" />;
  }
}));
jest.mock("@/src/components/commons/fetch-section/code-snippet", () => ({
  __esModule: true,
  default: (props: { code: string }) => (
    <div data-testid="code-snippet">{props.code}</div>
  )
}));
jest.mock("@/src/components/commons/fetch-section/fetch-button", () => ({
  __esModule: true,
  default: (props: { fetchData: () => void }) => (
    <button data-testid="fetch-button" onClick={props.fetchData}>
      FetchButton
    </button>
  )
}));
jest.mock("@/src/components/commons/fetch-section/copy-btn", () => ({
  __esModule: true,
  default: (props: { target: string }) => (
    <button data-testid="copy-btn">{props.target}</button>
  )
}));
jest.mock("@/src/components/commons/fetch-section/fetch-result", () => ({
  __esModule: true,
  default: (props: { data: DummyDataResonses; isLoading: boolean }) => (
    <div data-testid="fetch-result">
      {props.isLoading ? "Loading..." : JSON.stringify(props.data)}
    </div>
  )
}));

describe("PlayCode 컴포넌트", () => {
  const mockUseEndpointMenu = useEndpointMenu as jest.Mock;
  const mockUseFetch = useFetch as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseEndpointMenu.mockImplementation(() => ({
      ...mockEndpointMenuDefault
    }));
    mockUseFetch.mockImplementation(() => ({ ...mockFetchDefault }));
  });

  it("EndpointMenu, CodeSnippet, FetchButton, CopyBtn, FetchResult 컴포넌트들이 모두 렌더링된다", () => {
    render(<PlayCode />);
    expect(screen.getByTestId("endpoint-menu")).toBeInTheDocument();
    expect(screen.getByTestId("code-snippet")).toHaveTextContent("fetch code");
    expect(screen.getByTestId("fetch-button")).toBeInTheDocument();
    expect(screen.getByTestId("copy-btn")).toHaveTextContent("fetch code");
    expect(screen.getByTestId("fetch-result")).toHaveTextContent(
      '{"test":"test"}'
    );
  });

  it("EndpointMenu에 useEndpointMenu의 값이 올바르게 전달된다", () => {
    render(<PlayCode />);
    const calledProps = mockEndpointMenuProps.mock.calls[0][0];
    expect(calledProps).toHaveProperty("ENDPOINTS", ["users", "posts"]);
    expect(calledProps).toHaveProperty("endpoint", "users");
    expect(calledProps).toHaveProperty("isOpenEndpointMenu", false);
  });

  it("FetchButton 클릭 시 endpoint가 'Endpoint'면 alert가 호출된다", () => {
    mockUseEndpointMenu.mockImplementation(() => ({
      ...mockEndpointMenuDefault,
      endpoint: "Endpoint"
    }));
    window.alert = jest.fn();
    render(<PlayCode />);
    fireEvent.click(screen.getByTestId("fetch-button"));
    expect(window.alert).toHaveBeenCalledWith("Endpoint를 선택해주세요.");
  });

  it("FetchButton 클릭 시 endpoint가 정상 값이면 fetchData가 호출된다", () => {
    const fetchDataMock = jest.fn();
    mockUseFetch.mockImplementation(() => ({
      ...mockFetchDefault,
      fetchData: fetchDataMock
    }));
    render(<PlayCode />);
    fireEvent.click(screen.getByTestId("fetch-button"));
    expect(fetchDataMock).toHaveBeenCalledWith("/apiusers");
  });
});
