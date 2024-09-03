"use client";

import React, {
  MutableRefObject,
  createContext,
  useEffect,
  useRef,
  useState
} from "react";

interface IMobileNavContext {
  isOpenMenu: boolean;
  menuRef: MutableRefObject<HTMLDivElement | null>;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export const MobileNavContext = createContext<IMobileNavContext>({
  isOpenMenu: false,
  menuRef: {} as React.MutableRefObject<null>,
  closeMenu: () => {},
  toggleMenu: () => {}
});

interface IProps {
  children: React.ReactNode;
}

export default function MobileNavProvider({ children }: IProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  const toggleMenu = () => {
    if (isOpenMenu) {
      menuRef.current?.classList.add("animate-slideOutRight");
      timeoutRef.current = setTimeout(() => {
        setIsOpenMenu((prev) => !prev);
      }, 400);
    } else {
      setIsOpenMenu((prev) => !prev);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <MobileNavContext.Provider
      value={{
        isOpenMenu,
        menuRef,
        closeMenu,
        toggleMenu
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
}
