import { DOCS_MENU } from "@/src/constants/constants";
import { optimizationTabFocus } from "@/src/lib/optimizationKeyboard";
import { useEffect, useRef, useState } from "react";
import useKeyboardFocusMenu from "../commons/useKeyboardFocusMenu";

export default function useMobileNavList() {
  const [isOpenDocsMenu, setIsOpenDocsMenu] = useState(false);
  const arcodianRef = useRef<HTMLUListElement | null>(null);
  const firstNavMenuRef = useRef<HTMLAnchorElement | null>(null);
  const lastNavMenuPreviousRef = useRef<HTMLAnchorElement | null>(null);
  const lastNavMenuRef = useRef<HTMLButtonElement | null>(null);

  const {
    firstMenuRef: firstDocsMenuRef,
    lastMenuPrevRef: lastDocsMenuPrevRef,
    lastMenuRef: lastDocsMenuRef,
    setMenuListRef: setDocsMenuListRef,
    handlMenuFocusOnTab,
    handleKeyDownEsc
  } = useKeyboardFocusMenu({ menuItems: DOCS_MENU });

  const handleDocsMenuFocusOnTab = (e: any, index: number) =>
    handlMenuFocusOnTab(e, index, {
      firstMenuRef: firstNavMenuRef,
      lastMenuPrevRef: lastDocsMenuPrevRef,
      lastMenuRef: lastNavMenuRef
    });

  const handleHomeLinkFocusOnTab = (
    e: React.KeyboardEvent<HTMLAnchorElement>
  ) => {
    optimizationTabFocus({
      event: e,
      previousTarget: isOpenDocsMenu
        ? lastDocsMenuRef.current
        : lastNavMenuRef.current
    });
  };

  const handleDocsBtnFocusOnTab = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    optimizationTabFocus({
      event: e,
      previousTarget: lastNavMenuPreviousRef.current,
      nextTarget: isOpenDocsMenu
        ? firstDocsMenuRef.current
        : firstNavMenuRef.current
    });
  };

  const toggleDocsMenu = () => {
    setIsOpenDocsMenu((prev) => !prev);
    if (isOpenDocsMenu) {
      lastNavMenuRef.current?.focus();
    }
  };

  useEffect(() => {
    if (arcodianRef.current) {
      if (isOpenDocsMenu) {
        arcodianRef.current.style.maxHeight = `${arcodianRef.current.scrollHeight + 10}px`;
        arcodianRef.current.classList.add("border-t");
        arcodianRef.current.classList.add("border-b");
        arcodianRef.current?.focus();
      } else {
        arcodianRef.current.classList.remove("border-t");
        arcodianRef.current.classList.remove("border-b");
        arcodianRef.current.style.maxHeight = "0";
      }
    }
  }, [isOpenDocsMenu]);

  return {
    DOCS_MENU,
    isOpenDocsMenu,
    toggleDocsMenu,
    arcodianRef,
    firstNavMenuRef,
    lastNavMenuPreviousRef,
    lastNavMenuRef,
    firstDocsMenuRef,
    lastDocsMenuPrevRef,
    lastDocsMenuRef,
    setDocsMenuListRef,
    handleHomeLinkFocusOnTab,
    handleDocsBtnFocusOnTab,
    handleDocsMenuFocusOnTab,
    handleKeyDownEsc
  };
}
