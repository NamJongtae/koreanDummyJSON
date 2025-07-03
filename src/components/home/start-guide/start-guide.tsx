"use client";

import useSectionVisibility from "@/src/hooks/commons/useSectionVisibility";
import NpmCdnGuide from "./npm-cdn-guide";
import GuidePageIntro from "./guide-page-intro";
import DocsPageIntro from "./docs-page-intro";
import Image from "next/image";

const StartGuide = () => {
  const { ref, isVisible } = useSectionVisibility();

  return (
    <section
      id="빠른-시작-가이드"
      className={`transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }  bg-gradient-to-br from-blue-50 to-gray-100 mx-4 py-20 px-4 mb-10 shadow-lg break-keep rounded-xl`}
      ref={ref}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-10 flex items-center justify-center gap-2">
          <Image
            src={"/icons/lightning-icon.svg"}
            className="w-9 sm:w-10"
            alt=""
            width={50}
            height={50}
          />
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
