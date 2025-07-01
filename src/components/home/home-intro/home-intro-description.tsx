import Link from "next/link";

export default function HomeIntroDescription() {
  return (
    <>
      <p className="text-base sm:text-lg md:text-xl mb-3 text-gray-500">
        <span className="font-medium">Korean Dummy JSON</span>은 한국어 기반의
        더미 데이터를 제공하기 위해 제작된 프로젝트로,{" "}
        <Link
          className="text-blue-600 betterhover:hover:underline underline-offset-2"
          href={"https://jsonplaceholder.typicode.com/"}
        >
          JSONPlaceholder
        </Link>
        에서 영감을 받아 개발되었습니다.
      </p>
      <p className="text-base  sm:text-lg md:text-xl mb-3 text-gray-500">
        한국어로 구성된 데이터를 통해 개발자들이 보다 현실적인 더미 데이터를
        제공 받을 수 있습니다.
      </p>
      <p className="text-base sm:text-lg md:text-xl mb-3 text-gray-500">
        추가로 JWT 기반 로그인 및 인증/인가 더미 API 및 동적 더미 이미지 API가
        제공됩니다.
      </p>
      <p className="text-base sm:text-lg md:text-xl mb-3 text-gray-500 whitespace-pre-line">
        {
          "한글 로렘 입숨 API가 새롭게 추가되었습니다.\nAPI를 직접 사용하지 않아도 LOREM 페이지에서 한글 로렘 입숨을 바로 만들 수 있습니다.\n문단, 문장, 단어 모드를 선택하고 원하는 개수와 글자 수를 지정해 한글 로렘 입숨을 생성해보세요."
        }
      </p>
      <p className="text-base sm:text-lg md:text-xl mb-3 text-gray-500">
        GET, POST, PUT, PATCH, DELETE 요청을 보내고 직접 테스트 해보고 학습해
        보세요.
      </p>
      <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-500">
        <Link
          href={"https://www.npmjs.com/package/korean-dummy-json-fetcher"}
          className="text-blue-600 betterhover:hover:underline underline-offset-2 mr-1"
        >
          Korean Dummy JSON Fetcher
        </Link>
        라이브러리를 통해 직접 비동기 API 호출 없이 더미 데이터를 쉽게 사용할 수
        있습니다.
      </p>
      <p id="tags" className="sr-only">
        #korean json, #dummy json, #한국어 더미 데이터
      </p>
    </>
  );
}
