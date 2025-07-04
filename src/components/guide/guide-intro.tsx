import Link from "next/link";

export default function GuideIntro() {
  return (
    <section
      id="소개"
      className="relative mt-20 px-7 py-8 border-8 mx-5 border-double break-keep"
    >
      <h2 className="absolute -top-8 bg-white left-10 text-4xl font-semibold mb-5 px-2">
        🚀 Guide
      </h2>

      <p className="section-text mb-2">
        현재 가이드는 <b>기본 6가지 Resource(users, todos, posts, comments, books,
          reviews)</b>를 대상으로 Fetch API를 사용한 예시를 제공합니다.
      </p>

      <p className="section-text mb-2">
        예시 코드를 복사하여 브라우저 개발자 도구 콘솔에 붙여 넣으면 간단하게 실행해볼 수
        있습니다.
      </p>

      <p className="section-text mb-2">
        <Link
          className="text-blue-600 betterhover:hover:underline underline-offset-4"
          href={"/guide#라이브러리로-빠르게-시작하기"}
        >
          korean-dummy-json-fetcher 라이브러리 혹은 CDN
        </Link>
        를 사용하면 더 편리하게 API를 사용할 수 있습니다.
      </p>

      <p className="section-text mb-6">
        각 리소스에 대한 더 자세한 설명은{" "}
        <Link
          className="text-blue-600 betterhover:hover:underline underline-offset-4"
          href={"/docs/users"}
        >
          Docs
        </Link>
        를 참고해주세요.
      </p>

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
