"use client";

import HomeIntroContent from "./home-intro-content";

export default function HomeIntro() {
  return (
    <section id="소개" className={"t-5 px-4 break-keep"}>
      <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold mt-10 mb-7 md:mt-20 md:mb-14">
        <span className="text-gray-300">{"{ "}</span>Korean Dummy JSON{" "}
        <span className="text-gray-300">{" }"}</span>
      </h2>
      <HomeIntroContent />
    </section>
  );
}
