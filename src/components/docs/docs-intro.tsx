"use client";

import { usePathname } from "next/navigation";

export default function DocsIntro() {
  const pathname = usePathname();
  const docsName = pathname.replace("/docs/", "");

  const getIntro = () => {
    switch (docsName) {
      case "users":
        return "총 20개의 유저 데이터가 제공됩니다.";
      case "todos":
        return "총 200개의 할 일 데이터가 제공됩니다.";
      case "posts":
        return "총 100개의 게시물 데이터가 제공됩니다.";
      case "comments":
        return "총 500개의 댓글 데이터가 제공됩니다.";
      case "books":
        return "총 100개의 책 데이터가 제공됩니다.";
      case "reviews":
        return "총 500개의 리뷰 데이터가 제공됩니다.";
      case "auth":
        return "로그인 및 인증/인가 기능을 제공합니다.";
      case "image":
        return `동적 이미지 생성 기능을 제공합니다.\n이미지 값(size, bgColor, textColor, ext, text)을 직접 설정하여 이미지를 생성할 수 있습니다.`;
      default:
        return null;
    }
  };

  return (
    <section id="소개" className="mt-5 px-6">
      <h2 className="hidden">intro</h2>
      <p className="text-lg sm:text-xl mb-4 whitespace-pre-wrap leading-8 sm:leading-10">
        {getIntro()}
      </p>
      {
        <p className="relative flex section-text bg-yellow-100 p-3 border-l-4 border-yellow-500 text-yellow-900 font-semibold ">
          <span className="absolute">⚠️</span>
          <span className="pl-8">
            {pathname.includes("image")
              ? "이미지의 최대 size는 2560x2560이며, 이미지 지원 형식은 .jpeg, .jpg, .png, .svg입니다."
              : "POST, PUT, PATCH, DELETE Method는 실제 서버 DB에는 영향을 주지 않으며, 더미 데이터로 처리됩니다."}
          </span>
        </p>
      }
    </section>
  );
}
