"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavDocsMenu from "./nav-docs-menu";

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden md:block mr-10">
        <ul className="flex gap-3 items-center relative">
          <li>
            <Link
              className={`${
                pathname === "/" ? "text-blue-400" : undefined
              } betterhover:hover:text-blue-400 transition-all delay-75`}
              href={"/"}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              className={`${
                pathname === "/guide" ? "text-blue-400" : undefined
              } betterhover:hover:text-blue-400 transition-all delay-75`}
              href={"/guide"}
            >
              GUIDE
            </Link>
          </li>
          <li className="relative">
            <NavDocsMenu />
          </li>
        </ul>
      </nav>
    </>
  );
}
