import { useEffect, useRef, useState } from "react";

export function useSectionVisibility() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 애니메이션이 한 번만 작동하도록 감시 중지
        }
      },
      {
        threshold: 0.1 // 섹션의 10%가 보일 때 트리거
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect(); // 컴포넌트가 언마운트 될 때 옵저버 해제
    };
  }, []);

  return { ref, isVisible };
}
