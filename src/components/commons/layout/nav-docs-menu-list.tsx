import { DOCS_MENU } from "./nav-docs-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface IProps {
  docsMenuRef: React.MutableRefObject<HTMLUListElement | null>;
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

export default function NavDocsMenuList({
  docsMenuRef,
  setDocsMenuListRef,
  handleKeyDownEsc,
  handleKeyDownTabDocsMenu,
  toggleDocsMenu
}: IProps) {
  const pathname = usePathname();

  return (
    <ul
      ref={docsMenuRef}
      className={`absolute top-8 left-0 flex flex-col px-4 pt-2 pb-4 gap-2 backdrop-blur-sm bg-white border rounded shadow-lg animate-entering`}
      onKeyDown={(e) => handleKeyDownEsc(e, toggleDocsMenu)}
    >
      {DOCS_MENU.map((doc, index) => (
        <li key={doc}>
          <Link
            className={`${
              pathname === `/docs/${doc.toLocaleLowerCase()}`
                ? "text-blue-400"
                : undefined
            } betterhover:hover:text-blue-400 transition-colors delay-75 focus:outline-none focus:text-blue-400`}
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
