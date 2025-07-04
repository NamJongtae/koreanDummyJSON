import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function useSectionNavigator() {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const navigatorRef = useRef<HTMLUListElement | null>(null);

  const enterNavigator = () => {
    setHovered(true);
  };

  const leaveNavigator = () => {
    navigatorRef.current?.classList.add("animate-sectionNavSlideRight");
    setTimeout(() => {
      setHovered(false);
    }, 400);
  };

  const handleClickSection = (sectionId: string) => {
    const encodedData = `#${encodeURI(sectionId)}`;
    if (sectionId === "소개") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      router.push(encodedData);
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
