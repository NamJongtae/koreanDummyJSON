import Link from "next/link";
import CodeSnippet from "../../commons/fetch-section/code-snippet";
import { useCdnLinks } from "@/src/hooks/home/useCdnLinks";
import useCopy from "@/src/hooks/commons/useCopy";

export default function NpmCdnGuide() {
  const { jsdelivr, unpkg } = useCdnLinks();

  const { isCopied: isJsdelivrCopied, handleCopy: handleJsdelivrCopy } =
    useCopy({ target: jsdelivr, timer: 1200 });
  const { isCopied: isUnpkgCopied, handleCopy: handleUnpkgCopy } = useCopy({
    target: unpkg,
    timer: 1200
  });

  return (
    <>
      <p className="text-lg md:text-xl text-gray-600 mb-1 whitespace-pre-line">
        <Link
          href={"https://www.npmjs.com/package/korean-dummy-json-fetcher"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 betterhover:hover:underline underline-offset-2 mr-1"
        >
          Korean Dummy JSON Fetcher
        </Link>
        {
          "라이브러리를 설치하여 직접 비동기 API 호출 없이\n더미 데이터를 쉽게 사용할 수 있습니다."
        }
      </p>
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        아래 CDN 링크를 통해 라이브러리를 사용해보세요.
      </p>
      <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-left text-gray-700 font-semibold">jsDelivr</p>
            <button
              onClick={handleJsdelivrCopy}
              className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-md betterhover:hover:bg-gray-300 transition-all w-20"
            >
              {isJsdelivrCopied ? "복사됨!" : "복사"}
            </button>
          </div>
          <CodeSnippet code={jsdelivr} />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-left text-gray-700 font-semibold">unpkg</p>
            <button
              onClick={handleUnpkgCopy}
              className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-md betterhover:hover:bg-gray-300 transition-all w-20"
            >
              {isUnpkgCopied ? "복사됨!" : "복사"}
            </button>
          </div>
          <CodeSnippet code={unpkg} />
        </div>
      </div>
    </>
  );
}
