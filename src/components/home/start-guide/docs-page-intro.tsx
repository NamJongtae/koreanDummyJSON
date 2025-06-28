import Link from "next/link";

export default function DocsPageIntro() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
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
  );
}
