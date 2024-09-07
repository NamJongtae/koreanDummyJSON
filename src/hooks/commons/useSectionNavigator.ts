import { useRef, useState } from "react";

export default function useSectionNavigator() {
  const [hovered, setHovered] = useState(false);
  const navigatorRef = useRef<HTMLUListElement | null>(null);

  const enterNavigator = () => {
    setHovered(true);
  };

  const leaveNavigator = () => {
    navigatorRef.current?.classList.add("animate-steeperSlideRight");
    setTimeout(() => {
      setHovered(false);
    }, 400);
  };

  const handleClickSection = (sectionId: string) => {
    const encodedData = `#${encodeURI(sectionId)}`;
    window.location.hash = encodedData;
    if (sectionId === "소개") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return {
    hovered,
    navigatorRef,
    enterNavigator,
    leaveNavigator,
    handleClickSection
  };
}
