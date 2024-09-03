import { useRef } from "react";
import {
  optimizationTabFocus,
  escKeyClose
} from "@/src/lib/optimizationKeyboard";

interface UseMenuNavigationProps {
  menuItems: string[];
}

export default function useKeyboardFocusMenu({
  menuItems
}: UseMenuNavigationProps) {
  const firstMenuRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(
    null
  );
  const lastMenuPrevRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(
    null
  );
  const lastMenuRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(
    null
  );

  const setMenuListRef = (index: number) => {
    if (index === 0) return firstMenuRef;
    if (index === menuItems.length - 1) return lastMenuRef;
    if (index === menuItems.length - 2) return lastMenuPrevRef;
    return null;
  };

  const handlMenuFocusOnTab = (
    e: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>,
    index: number,
    customTarget?: {
      firstMenuRef: React.MutableRefObject<HTMLElement | null>;
      lastMenuPrevRef: React.MutableRefObject<HTMLElement | null>;
      lastMenuRef: React.MutableRefObject<HTMLElement | null>;
    }
  ) => {
    if (index === menuItems.length - 1) {
      optimizationTabFocus({
        event: e,
        previousTarget: customTarget
          ? customTarget.lastMenuPrevRef.current
          : lastMenuPrevRef.current,
        nextTarget: customTarget
          ? customTarget.firstMenuRef.current
          : firstMenuRef.current
      });
    } else if (index === 0) {
      optimizationTabFocus({
        event: e,
        previousTarget: customTarget
          ? customTarget.lastMenuRef.current
          : lastMenuRef.current
      });
    }
  };

  const handleKeyDownEsc = (
    e: React.KeyboardEvent<
      HTMLAnchorElement | HTMLButtonElement | HTMLUListElement
    >,
    closeMenu: () => void
  ) => {
    escKeyClose({ event: e, closeCb: closeMenu });
  };

  return {
    firstMenuRef,
    lastMenuPrevRef,
    lastMenuRef,
    setMenuListRef,
    handlMenuFocusOnTab,
    handleKeyDownEsc
  };
}
