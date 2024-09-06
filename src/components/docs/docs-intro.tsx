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
      default:
        return null;
    }
  };

  return (
    <section id="소개" className="mt-5 px-6">
      <h2 className="hidden">intro</h2>
      <p className="text-lg sm:text-xl mb-4">{getIntro()}</p>
      <p className="relative flex section-text bg-yellow-100 p-3 border-l-4 border-yellow-500 text-yellow-900 font-semibold ">
        <span className="absolute">⚠️</span>
        <span className="pl-8">
          POST, PUT, PATCH, DELETE Method는 실제 서버 DB에는 영향을 주지 않으며,
          더미 데이터로 처리됩니다.
        </span>
      </p>
    </section>
  );
}
