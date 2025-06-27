import { usePathname } from "next/navigation";
import NavDocsMenuList from "./nav-docs-menu-list";
import useNavDocsMenu from "@/src/hooks/layout-nav/useNavDocsMenu";

export default function NavDocsMenu() {
  const pathname = usePathname();

  const {
    isOpenDocsMenu,
    toggleDocsMenu,
    docsMenuRef,
    setDocsMenuListRef,
    handleKeyDownEsc,
    handleKeyDownTabDocsMenu
  } = useNavDocsMenu();

  return (
    <>
      <button
        onClick={toggleDocsMenu}
        className={`${
          pathname.includes("/docs") ? "text-blue-400" : undefined
        } hover-focus-effect transition-all delay-75 flex items-center`}
        onKeyDown={(e) => handleKeyDownEsc(e, toggleDocsMenu)}
      >
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
      </button>
      {isOpenDocsMenu && (
        <NavDocsMenuList
          ref={docsMenuRef}
          setDocsMenuListRef={setDocsMenuListRef}
          handleKeyDownEsc={handleKeyDownEsc}
          handleKeyDownTabDocsMenu={handleKeyDownTabDocsMenu}
          toggleDocsMenu={toggleDocsMenu}
        />
      )}
    </>
  );
}
