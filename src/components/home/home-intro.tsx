"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomeIntro() {

  return (
    <section
      className={"mt-5 px-4 break-keep"}
    >
      <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold mb-10">
        <span className="text-gray-300">{"{ "}</span>Korean Dummy JSON{" "}
        <span className="text-gray-300">{" }"}</span>
      </h2>
      <div className="relative px-5 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 border-8 border-double">
        <Image
          className="absolute left-3 -top-6 bg-white"
          src="/icons/double-quotes-left-icon.svg"
          alt='"'
          width="50"
          height="50"
        />
        <p className="text-base sm:text-lg md:text-xl mb-3 text-gray-500">
          Korean Dummy Json은 한국어 기반의 더미 데이터를 제공하기 위해 제작된
          프로젝트로, Placeholder Json에서 영감을 받아 개발되었습니다.
        </p>
        <p className="text-base  sm:text-lg md:text-xl mb-3 text-gray-500">
          한국어로 구성된 데이터를 통해 개발자들이 보다 현실적인 더미 데이터를
          제공 받을 수 있습니다.
        </p>
        <p className="text-base  sm:text-lg md:text-xl mb-6 text-gray-500">
          GET, POST, PUT, PATCH, DELETE 요청을 보내고 직접 테스트 해보고
          학습해보세요.
        </p>
        <Image
          className="absolute right-3 -bottom-6 bg-white"
          src="/icons/double-quotes-right-icon.svg"
          alt='"'
          width="50"
          height="50"
        />
        <Link
          href={"https://github.com/NamJongtae/korean_dummy_JSON"}
          className="inline-flex items-center gap-2 rounded-full border px-2 sm:px-3 py-2 transition-colors betterhover:hover:bg-gray-100"
        >
          <Image
            src={"/icons/github-icon.svg"}
            alt="github"
            width={32}
            height={32}
          />
          <span className="hidden sm:block">GitHub</span>
        </Link>
      </div>
    </section>
  );
}
