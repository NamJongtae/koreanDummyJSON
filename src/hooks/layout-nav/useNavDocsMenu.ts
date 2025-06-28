import useDropdownMenu from "../commons/useDropDownMenu";
import { useRouter } from "next/navigation";
import { DOCS_MENU } from "@/src/constants/constants";
import useKeyboardFocusMenu from "../commons/useKeyboardFocusMenu";

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
    handleMenuFocusOnTab: handleKeyDownTabDocsMenu,
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
