import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileNavList from "@/src/components/commons/layout/mobile-nav/mobile-nav-list";

jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img data-testid="mock-image" {...props} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

jest.mock("next/link", () => {
  const MockLink = React.forwardRef<HTMLAnchorElement, any>(function MockLink(
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

jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}));

jest.mock("@/src/hooks/layout-nav/useMobileNavList", () => jest.fn());

const mockMobileNavDocsMenu = jest.fn();
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

const mockMobileNavMenuLink = jest.fn();
jest.mock(
  "@/src/components/commons/layout/mobile-nav/mobile-nav-menu-link",
  () => {
    const MockMobileNavMenuLink = React.forwardRef<HTMLAnchorElement, any>(
      (props: any, ref) => {
        mockMobileNavMenuLink({ ...props, ref });
        return (
          <a
            data-testid="mock-mobile-nav-menu-link"
            onClick={props.onClick}
            onKeyDown={props.onKeyDown}
            ref={ref}
          >
            {props.children}
          </a>
        );
      }
    );
    MockMobileNavMenuLink.displayName = "MockMobileNavMenuLink";
    return MockMobileNavMenuLink;
  }
);

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

  it("MobileNavMenuLink가 올바른 props와 함께 3번 렌더링된다", () => {
    render(<MobileNavList toggleNavMenu={toggleNavMenu} />);

    // HOME 메뉴 검증
    expect(mockMobileNavMenuLink).toHaveBeenCalledWith(
      expect.objectContaining({
        href: "/",
        iconSrc: "/icons/home-icon.svg",
        iconAlt: "home",
        isActive: true,
        onClick: toggleNavMenu,
        ref: mockNavList.firstNavMenuRef,
        onKeyDown: mockNavList.handleHomeLinkFocusOnTab,
        children: "HOME"
      })
    );

    // LOREM 메뉴 검증
    expect(mockMobileNavMenuLink).toHaveBeenCalledWith(
      expect.objectContaining({
        href: "/lorem",
        iconSrc: "/icons/lorem-icon.svg",
        iconAlt: "lorem",
        isActive: false,
        onClick: toggleNavMenu,
        children: "LOREM"
      })
    );

    // GUIDE 메뉴 검증
    expect(mockMobileNavMenuLink).toHaveBeenCalledWith(
      expect.objectContaining({
        href: "/guide",
        iconSrc: "/icons/guide-icon.svg",
        iconAlt: "guide",
        isActive: false,
        onClick: toggleNavMenu,
        ref: mockNavList.lastNavMenuPreviousRef,
        children: "GUIDE"
      })
    );

    expect(mockMobileNavMenuLink).toHaveBeenCalledTimes(3);
  });

  it("HOME, LOREM, GUIDE 클릭 시 toggleNavMenu가 호출된다", () => {
    render(<MobileNavList toggleNavMenu={toggleNavMenu} />);
    fireEvent.click(screen.getAllByTestId("mock-mobile-nav-menu-link")[0]);
    fireEvent.click(screen.getAllByTestId("mock-mobile-nav-menu-link")[1]);
    fireEvent.click(screen.getAllByTestId("mock-mobile-nav-menu-link")[2]);
    expect(toggleNavMenu).toHaveBeenCalledTimes(3);
  });

  it("HOME 링크 keyDown 시 handleHomeLinkFocusOnTab이 호출된다", () => {
    render(<MobileNavList toggleNavMenu={toggleNavMenu} />);
    fireEvent.keyDown(screen.getAllByTestId("mock-mobile-nav-menu-link")[0], {
      key: "Tab"
    });
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
