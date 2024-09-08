"use client";

import { MobileNavContext } from "@/src/store/mobile-nav-provider";
import { useContext } from "react";
import MenuIcon from "@/public/icons/menu-icon.svg";

export default function MobileNavBtn() {
  const { isOpenMenu, toggleMenu } = useContext(MobileNavContext);

  return (
    <button className="sm:block md:hidden" onClick={toggleMenu}>
      <MenuIcon
        className={`${isOpenMenu ? "fill-blue-400" : "fill-black"} transition-all delay-75`}
      />
      <span className="sr-only">mobile nav button</span>
    </button>
  );
}
