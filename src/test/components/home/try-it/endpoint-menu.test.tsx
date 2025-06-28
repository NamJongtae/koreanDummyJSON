import { render, screen, fireEvent } from "@testing-library/react";
import EndpointMenu from "@/src/components/home/try-it/endpoint-menu";
import { escKeyClose } from "@/src/lib/optimizationKeyboard";

jest.mock("@/src/components/home/try-it/endpoint-menu-list", () => ({
  __esModule: true,
  default: () => <ul data-testid="mock-endpoint-menu-list" />
}));
jest.mock("@/src/lib/optimizationKeyboard", () => ({
  escKeyClose: jest.fn()
}));

describe("EndpointMenu component test", () => {
  const ENDPOINTS = ["users", "posts"];
  const endpoint = "users";
  const selectEndpoint = jest.fn();
  const toggleEndpointMenu = jest.fn();
  const endpointMenuRef = {
    current: null
  } as React.MutableRefObject<HTMLUListElement | null>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("버튼이 endpoint 텍스트와 함께 렌더링된다", () => {
    render(
      <EndpointMenu
        ENDPOINTS={ENDPOINTS}
        endpoint={endpoint}
        selectEndpoint={selectEndpoint}
        isOpenEndpointMenu={false}
        toggleEndpointMenu={toggleEndpointMenu}
        endpointMenuRef={endpointMenuRef}
      />
    );
    expect(screen.getByRole("button", { name: endpoint })).toBeInTheDocument();
  });

  it("버튼 클릭 시 toggleEndpointMenu가 호출된다", () => {
    render(
      <EndpointMenu
        ENDPOINTS={ENDPOINTS}
        endpoint={endpoint}
        selectEndpoint={selectEndpoint}
        isOpenEndpointMenu={false}
        toggleEndpointMenu={toggleEndpointMenu}
        endpointMenuRef={endpointMenuRef}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: endpoint }));
    expect(toggleEndpointMenu).toHaveBeenCalled();
  });

  it("isOpenEndpointMenu가 true일 때 EndpointMenuList가 렌더링된다", () => {
    render(
      <EndpointMenu
        ENDPOINTS={ENDPOINTS}
        endpoint={endpoint}
        selectEndpoint={selectEndpoint}
        isOpenEndpointMenu={true}
        toggleEndpointMenu={toggleEndpointMenu}
        endpointMenuRef={endpointMenuRef}
      />
    );
    expect(screen.getByTestId("mock-endpoint-menu-list")).toBeInTheDocument();
  });

  it("isOpenEndpointMenu가 false일 때 EndpointMenuList가 렌더링되지 않는다", () => {
    render(
      <EndpointMenu
        ENDPOINTS={ENDPOINTS}
        endpoint={endpoint}
        selectEndpoint={selectEndpoint}
        isOpenEndpointMenu={false}
        toggleEndpointMenu={toggleEndpointMenu}
        endpointMenuRef={endpointMenuRef}
      />
    );
    expect(
      screen.queryByTestId("mock-endpoint-menu-list")
    ).not.toBeInTheDocument();
  });

  it("버튼에서 ESC 키 입력 시 escKeyClose가 호출되고 closeCb로 toggleEndpointMenu가 전달된다", () => {
    render(
      <EndpointMenu
        ENDPOINTS={ENDPOINTS}
        endpoint={endpoint}
        selectEndpoint={selectEndpoint}
        isOpenEndpointMenu={false}
        toggleEndpointMenu={toggleEndpointMenu}
        endpointMenuRef={endpointMenuRef}
      />
    );
    const button = screen.getByRole("button", { name: endpoint });
    fireEvent.keyDown(button, { key: "Escape" });
    expect(escKeyClose).toHaveBeenCalled();
    expect((escKeyClose as jest.Mock).mock.calls[0][0].closeCb).toBe(
      toggleEndpointMenu
    );
  });
});
