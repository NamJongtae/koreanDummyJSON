import useDropdownMenu from "../commons/useDropDownMenu";
import { useRouter } from "next/navigation";
import { DOCS_MENU } from "@/src/components/commons/layout/nav-docs-menu";
import useKeyboardFocusMenu from "../commons/useKeyboardFocusMenu"; // useKeyboardOptiMenu를 import 합니다.

export default function useNavDocsMenu() {
  const router = useRouter();

  const {
    isOpenMenu: isOpenDocsMenu,
    toggleMenu: toggleDocsMenu,
    closeMenu: closeDocsMenu,
    menuRef: docsMenuRef
  } = useDropdownMenu();

  const {
    firstMenuRef: firstDocsMenuRef,
    lastMenuPrevRef: lastDocsMenuPrevRef,
    lastMenuRef: lastDocsMenuRef,
    setMenuListRef: setDocsMenuListRef,
    handlMenuFocusOnTab: handleKeyDownTabDocsMenu,
    handleKeyDownEsc
  } = useKeyboardFocusMenu({ menuItems: DOCS_MENU });

  const handleClickDocMenu = (doc: string) => {
    router.push(`/docs/${doc.toLocaleLowerCase()}`);
    closeDocsMenu();
  };

  return {
    isOpenDocsMenu,
    toggleDocsMenu,
    closeDocsMenu,
    handleClickDocMenu,
    docsMenuRef,
    firstDocsMenuRef,
    lastDocsMenuPrevRef,
    lastDocsMenuRef,
    setDocsMenuListRef,
    handleKeyDownEsc,
    handleKeyDownTabDocsMenu
  };
}
