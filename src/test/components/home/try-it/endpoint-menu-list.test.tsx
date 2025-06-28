import { render, screen, fireEvent } from "@testing-library/react";
import EndpointMenuList from "@/src/components/home/try-it/endpoint-menu-list";
import { escKeyClose } from "@/src/lib/optimizationKeyboard";

const handleMenuFocusOnTab = jest.fn();
const setMenuListRef = jest.fn();
jest.mock("@/src/hooks/commons/useKeyboardFocusMenu", () => ({
  __esModule: true,
  default: () => ({
    setMenuListRef: (index: number) => setMenuListRef(index),
    handleMenuFocusOnTab
  })
}));
jest.mock("@/src/lib/optimizationKeyboard", () => ({
  escKeyClose: jest.fn()
}));

describe("EndpointMenuList component test", () => {
  const ENDPOINTS = ["users", "posts", "comments"];
  const selectEndpoint = jest.fn();
  const toggleEndpointMenu = jest.fn();
  const endpointMenuRef = {
    current: null
  } as React.MutableRefObject<HTMLUListElement | null>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("ENDPOINTS 배열의 각 항목이 버튼으로 렌더링된다", () => {
    render(
      <EndpointMenuList
        ENDPOINTS={ENDPOINTS}
        selectEndpoint={selectEndpoint}
        toggleEndpointMenu={toggleEndpointMenu}
        endpointMenuRef={endpointMenuRef}
      />
    );
    ENDPOINTS.forEach((endpoint) => {
      expect(
        screen.getByRole("button", { name: endpoint })
      ).toBeInTheDocument();
    });
  });

  it("버튼 클릭 시 selectEndpoint가 올바르게 호출된다", () => {
    render(
      <EndpointMenuList
        ENDPOINTS={ENDPOINTS}
        selectEndpoint={selectEndpoint}
        toggleEndpointMenu={toggleEndpointMenu}
        endpointMenuRef={endpointMenuRef}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "posts" }));
    expect(selectEndpoint).toHaveBeenCalledWith("posts");
  });

  it("ul에서 ESC 키 입력 시 toggleEndpointMenu가 호출된다", () => {
    const { container } = render(
      <EndpointMenuList
        ENDPOINTS={ENDPOINTS}
        selectEndpoint={selectEndpoint}
        toggleEndpointMenu={toggleEndpointMenu}
        endpointMenuRef={endpointMenuRef}
      />
    );
    const ul = container.querySelector("ul")!;
    fireEvent.keyDown(ul, { key: "Escape" });
    expect(escKeyClose).toHaveBeenCalled();
    expect((escKeyClose as jest.Mock).mock.calls[0][0].closeCb).toBe(
      toggleEndpointMenu
    );
  });

  it("ul 태그에 endpointMenuRef의 ref가 전달되는지 확인한다", () => {
    const endpointMenuRef = {
      current: null
    } as React.MutableRefObject<HTMLUListElement | null>;
    render(
      <EndpointMenuList
        ENDPOINTS={ENDPOINTS}
        selectEndpoint={selectEndpoint}
        toggleEndpointMenu={toggleEndpointMenu}
        endpointMenuRef={endpointMenuRef}
      />
    );
    const ul = screen.getByRole("menu");
    expect(endpointMenuRef.current).toBe(ul);
  });

  it("버튼에서 onKeyDown 시 handleMenuFocusOnTab이 호출된다", () => {
    render(
      <EndpointMenuList
        ENDPOINTS={ENDPOINTS}
        selectEndpoint={selectEndpoint}
        toggleEndpointMenu={toggleEndpointMenu}
        endpointMenuRef={endpointMenuRef}
      />
    );
    const button = screen.getByRole("button", { name: "users" });
    fireEvent.keyDown(button, { key: "Tab" });
    expect(handleMenuFocusOnTab).toHaveBeenCalled();
  });

  it("setMenuListRef를 통해 ref가 버튼에 제대로 전달되는지 확인한다", () => {
    let receivedButton: HTMLButtonElement | null = null;
    setMenuListRef.mockImplementation(
      (index: number) => (el: HTMLButtonElement | null) => {
        if (index === 0) receivedButton = el;
      }
    );
    render(
      <EndpointMenuList
        ENDPOINTS={["users"]}
        selectEndpoint={jest.fn()}
        toggleEndpointMenu={jest.fn()}
        endpointMenuRef={{ current: null }}
      />
    );
    const button = screen.getByRole("button", { name: "users" });
    expect(receivedButton).toBe(button);
  });
});
