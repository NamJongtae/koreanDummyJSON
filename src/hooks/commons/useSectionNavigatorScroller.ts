import { useEffect, useState } from "react";

export default function useSectionNavigatorScroller() {
  const [activeSectionId, setActiveSectionId] = useState<string | null>("소개");

  const handleScroll = () => {
    const sections = document.querySelectorAll("section"); // 모든 섹션 가져오기
    const scrollPosition = window.innerHeight + window.scrollY; // 현재 스크롤 위치와 화면 높이의 합
    const documentHeight = document.documentElement.offsetHeight; // 전체 높이

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionId = section.getAttribute("id");

      if (sectionTop >= 0 && sectionTop <= 70) {
        setActiveSectionId(sectionId);
      }

      // 마지막 섹션 활성화 처리
      if (scrollPosition >= documentHeight && index === sections.length - 1) {
        setActiveSectionId(sectionId);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { activeSectionId };
}
