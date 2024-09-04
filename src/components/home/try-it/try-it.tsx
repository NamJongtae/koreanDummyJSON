"use client";

import { useSectionVisibility } from "@/src/hooks/commons/useSectionVisibility";
import PlayCode from "./play-code";

export default function TryIt() {
  const { ref, isVisible } = useSectionVisibility();

  return (
    <section
      className={`transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-[150px]"
      } mt-20 px-4`}
      ref={ref}
    >
      <h2 className="section-title">직접 테스트 해보세요</h2>
      <p className="section-text mb-5">
        👇 아래 Endpoint를 선택하고 코드를 실행하여 데이터를 조회해보세요.
      </p>

      <PlayCode />
    </section>
  );
}
