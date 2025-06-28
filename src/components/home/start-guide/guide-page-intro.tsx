import Link from "next/link";

export default function GuidePageIntro() {
  return (
    <>
      <p className="text-lg md:text-xl text-gray-600 mt-12 mb-1">
        아래 가이드 페이지를 통해 쉽고 편리하게 Korean Dummy JSON를 사용할 수
        있습니다.
      </p>
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        예시 코드가 제공되어 복사하여 바로 사용할 수 있습니다.
      </p>
      <div className="mb-8 flex justify-center items-center flex-col gap-6">
        <Link
          href={"/guide"}
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out text-white rounded-full px-8 py-3 text-xl shadow-lg hover:shadow-2xl betterhover:hover:-translate-y-1"
        >
          🚀 Start Guide
        </Link>
      </div>
    </>
  );
}
