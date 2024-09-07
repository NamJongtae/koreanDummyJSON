import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileNavDocsMenuList from "./mobile-nav-docs-menu-list";

interface IProps {
  toggleNavMenu: () => void;
  isOpenDocsMenu: boolean;
  toggleDocsMenu: () => void;
  arcodianRef: React.MutableRefObject<HTMLUListElement | null>;
  lastNavMenuRef: React.MutableRefObject<HTMLButtonElement | null>;
  setDocsMenuListRef: (
    index: number
  ) => React.MutableRefObject<
    HTMLButtonElement | HTMLAnchorElement | null
  > | null;
  handleDocsBtnFocusOnTab: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  handleDocsMenuFocusOnTab: (
    e: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
    index: number
  ) => void;
  handleKeyDownEsc: (
    e: React.KeyboardEvent<HTMLUListElement>,
    closeCb: () => void
  ) => void;
}

export default function MobileNavDocsMenu({
  toggleNavMenu,
  isOpenDocsMenu,
  toggleDocsMenu,
  arcodianRef,
  lastNavMenuRef,
  setDocsMenuListRef,
  handleDocsBtnFocusOnTab,
  handleDocsMenuFocusOnTab,
  handleKeyDownEsc
}: IProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={toggleDocsMenu}
        onKeyDown={handleDocsBtnFocusOnTab}
        className={`${
          pathname.includes("/docs") ? "text-blue-400" : undefined
        } hover-focus-effect flex items-center gap-2  px-4 py-2`}
        ref={lastNavMenuRef}
      >
        <Image src={"/icons/docs-icon.svg"} alt="docs" width={24} height={24} />
        <span className="flex items-center gap-1">
          DOCS
          <svg
            className={`-mr-1 h-5 w-5 text-gray-400 transition-transform ${
              isOpenDocsMenu ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      <MobileNavDocsMenuList
        isOpenDocsMenu={isOpenDocsMenu}
        arcodianRef={arcodianRef}
        setDocsMenuListRef={setDocsMenuListRef}
        handleKeyDownEsc={handleKeyDownEsc}
        handleDocsMenuFocusOnTab={handleDocsMenuFocusOnTab}
        toggleNavMenu={toggleNavMenu}
        toggleDocsMenu={toggleDocsMenu}
      />
    </>
  );
}
