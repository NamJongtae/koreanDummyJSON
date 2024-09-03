import { useEffect, useRef, useState } from "react";

export default function useDropdownMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const firstMenuRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(
    null
  );
  const lastMenuPreviousRef = useRef<
    HTMLButtonElement | HTMLAnchorElement | null
  >(null);
  const lastMenuRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(
    null
  );

  const openMenu = () => {
    setIsOpenMenu(true);
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  const toggleMenu = () => {
    if (isOpenMenu) {
      if (!menuRef.current) return;
      menuRef.current.classList.remove("animate-entering");
      menuRef.current.classList.add("animate-leaving");
      timerRef.current = setTimeout(() => {
        closeMenu();
      }, 180);
      return;
    }
    openMenu();
  };

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        isOpenMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        toggleMenu();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpenMenu]);

  return {
    isOpenMenu,
    closeMenu,
    openMenu,
    toggleMenu,
    menuRef,
    timerRef,
    firstMenuRef,
    lastMenuPreviousRef,
    lastMenuRef
  };
}
