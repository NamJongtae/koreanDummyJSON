"use client";

import MobileNavBtn from "./mobile-nav/mobile-nav-btn";
import NavDocsMenu from "./nav-docs-menu";
import NavLink from "./nav-link";

export default function Nav() {
  return (
    <>
      <nav className="hidden md:block mr-10">
        <ul className="flex gap-3 items-center relative">
          <li>
            <NavLink href="/" label="HOME" />
          </li>
          <li>
            <NavLink href="/lorem" label="LOREM" />
          </li>
          <li>
            <NavLink href="/guide" label="GUIDE" />
          </li>
          <li className="relative">
            <NavDocsMenu />
          </li>
        </ul>
      </nav>
      <MobileNavBtn />
    </>
  );
}
