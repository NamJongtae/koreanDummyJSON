"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      className={`${pathname === href ? "text-blue-400" : ""} hover-focus-effect transition-all delay-75`}
      href={href}
    >
      {label}
    </Link>
  );
}
