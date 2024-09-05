import Link from "next/link";

export default function GuideIntro() {
  return (
    <section className="relative mt-20 px-7 py-8 border-8 mx-5 border-double break-keep">
      <h2 className="absolute -top-8 bg-white left-10 text-4xl font-semibold mb-5 px-2">
        🚀 Guide
      </h2>
      <p className="section-text mb-2">
        현재 Guide에서는 Fetch API를 사용합니다.
      </p>
      <p className="section-text mb-2">
        예시 코드를 복사하여 브라우저 콘솔에 붙여 넣으면 빠르게 사용 가능합니다.
      </p>

      <p className="section-text mb-2">
        현재 페이지에서 제공하는 Resource 외 다른 Resource도 사용법은
        동일합니다.
      </p>
      <p className="section-text mb-6">
        자세한 사용법은 Resource별{" "}
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
