import Image from "next/image";
import MobileNavDocsMenu from "./mobile-nav-docs-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useMobileNavList from "@/src/hooks/layout-nav/useMobileNavList";

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
        <Link
          className={`${
            pathname === "/" ? "text-blue-400" : undefined
          } inline-flex items-center gap-2 betterhover:hover:text-blue-400 transition-colors delay-75 focus:outline-none focus:bg-gray-200 px-4 py-2`}
          href={"/"}
          onKeyDown={handleHomeLinkFocusOnTab}
          onClick={toggleNavMenu}
          ref={firstNavMenuRef}
        >
          <Image
            src={"/icons/home-icon.svg"}
            alt="home"
            width={24}
            height={24}
          />
          HOME
        </Link>
      </li>
      <li>
        <Link
          className={`${
            pathname === "/guide" ? "text-blue-400" : undefined
          } inline-flex items-center gap-2 betterhover:hover:text-blue-400 transition-colors delay-75 focus:outline-none focus:bg-gray-200 px-4 py-2`}
          href={"/guide"}
          onClick={toggleNavMenu}
          ref={lastNavMenuPreviousRef}
        >
          <Image
            src={"/icons/guide-icon.svg"}
            alt="guide"
            width={24}
            height={24}
          />
          GUIDE
        </Link>
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
