"use client";

import useThrottle from "@/src/hooks/commons/useThrottle";
import { MobileNavContext } from "@/src/store/mobile-nav-provider";
import { useContext, useEffect } from "react";
import MobileNavList from "./mobile-nav-list";

export default function MobileNav() {
  const {
    isOpenMenu: isOpenNavMenu,
    toggleMenu: toggleNavMenu,
    closeMenu: closeNavMenu,
    menuRef: navMenuRef
  } = useContext(MobileNavContext);

  const throttle = useThrottle();

  const throttledResizeHandler = throttle(() => {
    if (window.innerWidth >= 640 && isOpenNavMenu) {
      closeNavMenu();
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("resize", throttledResizeHandler);
    return () => {
      window.removeEventListener("resize", throttledResizeHandler);
    };
  }, [throttledResizeHandler]);

  return (
    <aside className="sm:block md:hidden">
      {isOpenNavMenu && (
        <>
          <div
            role="overlay"
            onClick={toggleNavMenu}
            className="fixed z-10 inset-0 bg-black opacity-50 top-[76px] h-full"
          ></div>
          <div
            className="fixed z-10 h-full top-[66px] -right-5 px-5 py-6 w-[250px] backdrop-blur-sm bg-white animate-slideOutLeft"
            ref={navMenuRef}
          >
            <MobileNavList toggleNavMenu={toggleNavMenu} />
          </div>
        </>
      )}
    </aside>
  );
}
