import { DOCS_MENU } from "@/src/constants/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { forwardRef } from "react";

interface IProps {
  setDocsMenuListRef: (
    index: number
  ) => React.MutableRefObject<
    HTMLAnchorElement | HTMLButtonElement | null
  > | null;
  handleKeyDownEsc: (
    e: React.KeyboardEvent<
      HTMLUListElement | HTMLButtonElement | HTMLAnchorElement
    >,
    closeMenu: () => void
  ) => void;
  handleKeyDownTabDocsMenu: (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => void;
  toggleDocsMenu: () => void;
}

const NavDocsMenuList = forwardRef<HTMLUListElement, IProps>(
  (
    {
      setDocsMenuListRef,
      handleKeyDownEsc,
      handleKeyDownTabDocsMenu,
      toggleDocsMenu
    },
    ref
  ) => {
    const pathname = usePathname();

    return (
      <ul
        ref={ref}
        className="absolute top-8 left-0 flex flex-col px-4 pt-2 pb-4 gap-2 backdrop-blur-sm bg-white border rounded shadow-lg animate-entering"
        onKeyDown={(e) => handleKeyDownEsc(e, toggleDocsMenu)}
      >
        {DOCS_MENU.map((doc, index) => (
          <li key={doc}>
            <Link
              className={`${
                pathname === `/docs/${doc.toLocaleLowerCase()}`
                  ? "text-blue-400"
                  : "text-black"
              } hover-focus-effect transition-colors delay-75`}
              ref={
                setDocsMenuListRef(
                  index
                ) as React.MutableRefObject<HTMLAnchorElement | null> | null
              }
              onKeyDown={(e) => handleKeyDownTabDocsMenu(e, index)}
              href={`/docs/${doc.toLocaleLowerCase()}`}
              onClick={toggleDocsMenu}
            >
              {doc}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
);

NavDocsMenuList.displayName = "NavDocsMenuList";

export default NavDocsMenuList;
