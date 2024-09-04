"use client";

import { useSectionVisibility } from '@/src/hooks/commons/useSectionVisibility';
import Link from "next/link";

export default function StartGuide() {
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
          지금 바로 사용해보세요.
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-1">
          아래 가이드 페이지를 통해 쉽고 편리하게 Korean Dummy JSON를 사용할 수
          있습니다.
        </p>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          예시 코드가 제공되어 복사하여 바로 사용할 수 있습니다.
        </p>
        <div className="mb-20 flex justify-center items-center flex-col gap-6">
          <Link
            href={"/guide"}
            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out text-white rounded-full px-8 py-3 text-xl shadow-lg hover:shadow-2xl betterhover:hover:-translate-y-1"
          >
            🚀 Start Guide
          </Link>
        </div>
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          📃 DOCS 살펴보기
        </h3>
        <p className="text-md text-gray-600">
          DOCS 페이지는 각 Resources별 상세 설명을 제공합니다.
        </p>
        <p className="text-md text-gray-600">
          또한, Resources별 모든 Enpoints 예시 코드를 제공합니다.
        </p>
        <p className="text-md text-gray-600 mb-6">
          아래 DOCS 페이지에서 자세히 살펴보세요.
        </p>

        <Link
          href={"/docs/users"}
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-transform duration-300 transform betterhover:hover:-translate-y-1"
        >
          ✨ DOCS 페이지로 바로가기
        </Link>
      </div>
    </section>
  );
}
