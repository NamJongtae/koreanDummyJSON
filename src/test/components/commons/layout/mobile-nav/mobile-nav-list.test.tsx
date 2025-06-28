import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileNavList from "@/src/components/commons/layout/mobile-nav/mobile-nav-list";

// next/image mock
jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img data-testid="mock-image" {...props} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

// next/link mock
jest.mock("next/link", () => {
  const MockLink = React.forwardRef<any, any>(function MockLink(
    { href, children, prefetch, ...props },
    ref
  ) {
    return (
      <a href={href} ref={ref} {...props}>
        {children}
      </a>
    );
  });
  MockLink.displayName = "MockLink";
  return MockLink;
});

// usePathname mock
jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}));

// useMobileNavList mock
jest.mock("@/src/hooks/layout-nav/useMobileNavList", () => jest.fn());

const mockMobileNavDocsMenu = jest.fn();
// MobileNavDocsMenu mock
jest.mock(
  "@/src/components/commons/layout/mobile-nav/mobile-nav-docs-menu",
  () => {
    return {
      __esModule: true,
      default: (props: Record<string, unknown>) => {
        mockMobileNavDocsMenu(props);
        return <div data-testid="mock-docs-menu">{JSON.stringify(props)}</div>;
      }
    };
  }
);

import { usePathname } from "next/navigation";
import useMobileNavList from "@/src/hooks/layout-nav/useMobileNavList";

describe("MobileNavList component test", () => {
  const toggleNavMenu = jest.fn();
  const mockNavList = {
    isOpenDocsMenu: false,
    toggleDocsMenu: jest.fn(),
    arcodianRef: { current: null },
    firstNavMenuRef: { current: null },
    lastNavMenuPreviousRef: { current: null },
    lastNavMenuRef: { current: null },
    setDocsMenuListRef: jest.fn(() => ({ current: null })),
    handleHomeLinkFocusOnTab: jest.fn(),
    handleDocsBtnFocusOnTab: jest.fn(),
    handleDocsMenuFocusOnTab: jest.fn(),
    handleKeyDownEsc: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue("/");
    (useMobileNavList as jest.Mock).mockReturnValue(mockNavList);
  });

  it("HOME, GUIDE, DOCS 메뉴와 아이콘이 렌더링된다", () => {
    render(<MobileNavList toggleNavMenu={toggleNavMenu} />);
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("GUIDE")).toBeInTheDocument();
    expect(screen.getByTestId("mock-docs-menu")).toBeInTheDocument();
    expect(screen.getAllByTestId("mock-image")).toHaveLength(2); // HOME, GUIDE 아이콘
  });

  it("/ 경로일 때 HOME 링크에 파란색 스타일 클래스가 적용된다", () => {
    render(<MobileNavList toggleNavMenu={toggleNavMenu} />);
    expect(screen.getByText("HOME").closest("a")).toHaveClass("text-blue-400");
  });

  it("/guide 경로일 때 GUIDE 링크에 파란색 스타일 클래스가 적용된다", () => {
    (usePathname as jest.Mock).mockReturnValue("/guide");
    render(<MobileNavList toggleNavMenu={toggleNavMenu} />);
    expect(screen.getByText("GUIDE").closest("a")).toHaveClass("text-blue-400");
  });

  it("HOME, GUIDE 클릭 시 toggleNavMenu가 호출된다", () => {
    render(<MobileNavList toggleNavMenu={toggleNavMenu} />);
    fireEvent.click(screen.getByText("HOME").closest("a")!);
    fireEvent.click(screen.getByText("GUIDE").closest("a")!);
    expect(toggleNavMenu).toHaveBeenCalledTimes(2);
  });

  it("HOME 링크 keyDown 시 handleHomeLinkFocusOnTab이 호출된다", () => {
    render(<MobileNavList toggleNavMenu={toggleNavMenu} />);
    fireEvent.keyDown(screen.getByText("HOME").closest("a")!, { key: "Tab" });
    expect(mockNavList.handleHomeLinkFocusOnTab).toHaveBeenCalled();
  });

  it("ul에서 keyDown 시 handleKeyDownEsc가 호출된다", () => {
    render(<MobileNavList toggleNavMenu={toggleNavMenu} />);
    fireEvent.keyDown(screen.getByRole("list"), { key: "Escape" });
    expect(mockNavList.handleKeyDownEsc).toHaveBeenCalled();
  });

  it("MobileNavDocsMenu에 올바른 props가 전달된다", () => {
    render(<MobileNavList toggleNavMenu={toggleNavMenu} />);
    expect(mockMobileNavDocsMenu).toHaveBeenCalled();

    const calledProps = mockMobileNavDocsMenu.mock.calls[0][0];

    expect(calledProps).toHaveProperty("toggleNavMenu");
    expect(calledProps).toHaveProperty("isOpenDocsMenu");
    expect(calledProps).toHaveProperty("toggleDocsMenu");
    expect(calledProps).toHaveProperty("arcodianRef");
    expect(calledProps).toHaveProperty("lastNavMenuRef");
    expect(calledProps).toHaveProperty("setDocsMenuListRef");
    expect(calledProps).toHaveProperty("handleDocsBtnFocusOnTab");
    expect(calledProps).toHaveProperty("handleDocsMenuFocusOnTab");
    expect(calledProps).toHaveProperty("handleKeyDownEsc");
  });
});
