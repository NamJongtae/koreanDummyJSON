import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_MENU } from "@/src/constants/constants";

interface IProps {
  isOpenDocsMenu: boolean;
  arcodianRef: React.MutableRefObject<HTMLUListElement | null>;
  setDocsMenuListRef: (
    index: number
  ) => React.MutableRefObject<
    HTMLAnchorElement | HTMLButtonElement | null
  > | null;
  handleDocsMenuFocusOnTab: (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => void;
  handleKeyDownEsc: (
    e: React.KeyboardEvent<HTMLUListElement>,
    closeCb: () => void
  ) => void;
  toggleNavMenu: () => void;
  toggleDocsMenu: () => void;
}

export default function MobileNavDocsMenuList({
  isOpenDocsMenu,
  arcodianRef,
  setDocsMenuListRef,
  handleDocsMenuFocusOnTab,
  handleKeyDownEsc,
  toggleNavMenu,
  toggleDocsMenu
}: IProps) {
  const pathname = usePathname();

  return (
    <ul
      tabIndex={-1}
      ref={arcodianRef}
      className={`flex flex-col mt-1 px-4 gap-1 mx-auto w-[150px] overflow-hidden duration-500 ease-in-out focus:outline-none focus:outline-0 ${
        isOpenDocsMenu ? "max-h-[500px]" : "max-h-0"
      }`}
      onKeyDown={(e) => {
        e.stopPropagation();
        handleKeyDownEsc(e, toggleDocsMenu);
      }}
    >
      {DOCS_MENU.map((doc, index) => (
        <li key={doc} className="w-full">
          <Link
            className={`${
              pathname === `/docs/${doc.toLocaleLowerCase()}`
                ? "text-blue-400"
                : "text-black"
            } w-full inline-block px-1 py-1 hover-focus-effect`}
            href={`/docs/${doc.toLocaleLowerCase()}`}
            onClick={toggleNavMenu}
            ref={
              setDocsMenuListRef(
                index
              ) as React.MutableRefObject<HTMLAnchorElement | null>
            }
            onKeyDown={(e) => handleDocsMenuFocusOnTab(e, index)}
          >
            {doc}
          </Link>
        </li>
      ))}
    </ul>
  );
}
