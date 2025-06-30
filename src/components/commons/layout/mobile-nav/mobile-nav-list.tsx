import MobileNavDocsMenu from "./mobile-nav-docs-menu";
import { usePathname } from "next/navigation";
import useMobileNavList from "@/src/hooks/layout-nav/useMobileNavList";
import MobileNavMenuLink from "./mobile-nav-menu-link";

interface IProps {
  toggleNavMenu: () => void;
}

export default function MobileNavList({ toggleNavMenu }: IProps) {
  const pathname = usePathname();

  const {
    isOpenDocsMenu,
    toggleDocsMenu,
    arcodianRef,
    firstNavMenuRef,
    lastNavMenuPreviousRef,
    lastNavMenuRef,
    setDocsMenuListRef,
    handleHomeLinkFocusOnTab,
    handleDocsBtnFocusOnTab,
    handleDocsMenuFocusOnTab,
    handleKeyDownEsc
  } = useMobileNavList();

  return (
    <ul
      className="flex flex-col gap-1 text-lg"
      onKeyDown={(e) => handleKeyDownEsc(e, toggleNavMenu)}
    >
      <li>
        <MobileNavMenuLink
          href="/"
          iconSrc="/icons/home-icon.svg"
          iconAlt="home"
          isActive={pathname === "/"}
          onClick={toggleNavMenu}
          refProp={firstNavMenuRef}
          onKeyDown={handleHomeLinkFocusOnTab}
        >
          HOME
        </MobileNavMenuLink>
      </li>
      <li>
        <MobileNavMenuLink
          href="/lorem"
          iconSrc="/icons/lorem-icon.svg"
          iconAlt="lorem"
          isActive={pathname === "/lorem"}
          onClick={toggleNavMenu}
        >
          LOREM
        </MobileNavMenuLink>
      </li>
      <li>
        <MobileNavMenuLink
          href="/guide"
          iconSrc="/icons/guide-icon.svg"
          iconAlt="guide"
          isActive={pathname === "/guide"}
          onClick={toggleNavMenu}
          refProp={lastNavMenuPreviousRef}
        >
          GUIDE
        </MobileNavMenuLink>
      </li>
      <li>
        <MobileNavDocsMenu
          toggleNavMenu={toggleNavMenu}
          isOpenDocsMenu={isOpenDocsMenu}
          toggleDocsMenu={toggleDocsMenu}
          arcodianRef={arcodianRef}
          lastNavMenuRef={lastNavMenuRef}
          setDocsMenuListRef={setDocsMenuListRef}
          handleDocsBtnFocusOnTab={handleDocsBtnFocusOnTab}
          handleDocsMenuFocusOnTab={handleDocsMenuFocusOnTab}
          handleKeyDownEsc={handleKeyDownEsc}
        />
      </li>
    </ul>
  );
}
