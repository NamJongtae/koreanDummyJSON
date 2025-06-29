import Link from "next/link";
import { ReactNode, Ref } from "react";
import Image from "next/image";

interface NavMenuLinkProps {
  href: string;
  iconSrc: string;
  iconAlt: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  refProp?: Ref<HTMLAnchorElement>;
  isActive?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
}

export default function MobileNavMenuLink({
  href,
  iconSrc,
  iconAlt,
  children,
  className = "",
  onClick,
  refProp,
  isActive,
  onKeyDown
}: NavMenuLinkProps) {
  return (
    <Link
      className={`inline-flex items-center gap-2 px-4 py-2 hover-focus-effect ${isActive ? "text-blue-400" : ""} ${className}`}
      href={href}
      onClick={onClick}
      ref={refProp}
      onKeyDown={onKeyDown}
    >
      <Image src={iconSrc} alt={iconAlt} width={24} height={24} />
      {children}
    </Link>
  );
}
