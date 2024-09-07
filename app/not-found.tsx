import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pb-16 h-[calc(100vh-66px)]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 flex flex-col items-center px-4 md:px-8 py-8 rounded-lg shadow-2xl w-full max-w-[340px] sm:max-w-md">
        <p className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-gray-300">
          404
        </p>
        <p className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wider text-gray-500 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
          죄송합니다. 현재 페이지를 찾을 수 없습니다.
        </p>
        <Link
          href="/"
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
        >
          <Image
            src={"/icons/back-icon.svg"}
            alt={"홈으로"}
            width={20}
            height={20}
          />
          <span>홈으로 돌아가기</span>
        </Link>
      </div>
    </div>
  );
}
