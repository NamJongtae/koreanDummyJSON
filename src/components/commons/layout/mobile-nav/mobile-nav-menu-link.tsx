import Link from "next/link";
import { ReactNode, forwardRef } from "react";
import Image from "next/image";

interface NavMenuLinkProps {
  href: string;
  iconSrc: string;
  iconAlt: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
}

const MobileNavMenuLink = forwardRef<HTMLAnchorElement, NavMenuLinkProps>(
  (
    {
      href,
      iconSrc,
      iconAlt,
      children,
      className = "",
      onClick,
      isActive,
      onKeyDown
    },
    ref
  ) => {
    return (
      <Link
        className={`inline-flex items-center gap-2 px-4 py-2 hover-focus-effect ${isActive ? "text-blue-400" : ""} ${className}`}
        href={href}
        onClick={onClick}
        ref={ref}
        onKeyDown={onKeyDown}
      >
        <Image src={iconSrc} alt={iconAlt} width={24} height={24} />
        {children}
      </Link>
    );
  }
);

MobileNavMenuLink.displayName = "MobileNavMenuLink";

export default MobileNavMenuLink;
