"use client";

import { useSectionVisibility } from "@/src/hooks/commons/useSectionVisibility";
import NpmCdnGuide from "./npm-cdn-guide";
import GuidePageIntro from "./guide-page-intro";
import DocsPageIntro from "./docs-page-intro";

const StartGuide = () => {
  const { ref, isVisible } = useSectionVisibility();

  return (
    <section
      className={`transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      } bg-gradient-to-br from-blue-50 to-gray-100 py-16 px-4 md:px-8 lg:px-16 mb-10 shadow-lg break-keep`}
      ref={ref}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-10">
          빠른 시작 가이드
        </h2>
        <NpmCdnGuide />
        <GuidePageIntro />
      </div>

      <DocsPageIntro />
    </section>
  );
};

export default StartGuide;
