"use client";

import { useSectionVisibility } from "@/src/hooks/commons/useSectionVisibility";
import Image from "next/image";
import Link from "next/link";
import ApiRequestCount from "./api-request-count";

export default function HomeIntro() {
  const { ref, isVisible } = useSectionVisibility();

  return (
    <section
      className={`transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      } mt-5 px-4 break-keep`}
      ref={ref}
    >
      <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold mt-20 mb-14">
        <span className="text-gray-300">{"{ "}</span>Korean Dummy JSON{" "}
        <span className="text-gray-300">{" }"}</span>
      </h2>
      <div className="relative px-5 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 border-8 border-double">
        <Image
          className="absolute left-3 -top-4 sm:-top-5 lg:-top-6  bg-white w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px]"
          src="/icons/double-quotes-left-icon.svg"
          alt='"'
          width="50"
          height="50"
        />
        <p className="text-base sm:text-lg md:text-xl mb-3 text-gray-500">
          <span className="font-medium">Korean Dummy JSON</span>은 한국어 기반의
          더미 데이터를 제공하기 위해 제작된 프로젝트로,{" "}
          <Link
            className="text-blue-600 betterhover:hover:underline underline-offset-2"
            href={"https://jsonplaceholder.typicode.com/"}
          >
            JSONPlaceholder
          </Link>
          에서 영감을 받아 개발되었습니다.
        </p>
        <p className="text-base  sm:text-lg md:text-xl mb-3 text-gray-500">
          한국어로 구성된 데이터를 통해 개발자들이 보다 현실적인 더미 데이터를
          제공 받을 수 있습니다.
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-3 text-gray-500">
          추가로 JWT 기반 로그인 및 인증/인가 더미 API가 제공됩니다.
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-500">
          GET, POST, PUT, PATCH, DELETE 요청을 보내고 직접 테스트 해보고
          학습해 보세요.
        </p>
        <Image
          className="absolute right-3 -bottom-4 sm:-bottom-5 lg:-bottom-6 bg-white w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px]"
          src="/icons/double-quotes-right-icon.svg"
          alt=""
          width="50"
          height="50"
        />

        <div className="flex justify-between items-center">
          <ApiRequestCount />

          <Link
            href={"https://github.com/NamJongtae/korean_dummy_JSON"}
            className="inline-flex items-center gap-2 rounded-full border px-2 sm:px-3 py-2 transition-colors betterhover:hover:bg-gray-100"
          >
            <Image
              src={"/icons/github-icon.svg"}
              alt=""
              width={32}
              height={32}
            />
            <span className="sr-only sm:block">GitHub</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
