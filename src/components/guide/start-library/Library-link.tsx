import Link from "next/link";

export default function LibraryLink() {
  return (
    <p className="section-text mt-8 mb-16">
      더 자세한 사용법은{" "}
      <Link
        className="text-blue-600 betterhover:hover:underline underline-offset-4"
        href="https://www.npmjs.com/package/korean-dummy-json-fetcher"
        target="_blank"
        rel="noopener noreferrer"
      >
        공식 npm 문서
      </Link>
      를 참고해주세요.
    </p>
  );
}
