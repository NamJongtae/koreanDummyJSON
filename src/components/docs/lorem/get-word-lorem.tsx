import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetWordLorem() {
  return (
    <FetchSection
      className="mb-20"
      id="단어-로렘-입숨-생성하기"
      title="단어 로렘 입숨 생성하기"
      endpoint="/lorem?mode=w&count=5&length=3"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">단어 로렘 입숨을 생성합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의{" "}
            <span className="font-medium">count, length</span>를 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/lorem?mode=w&count=5&length=3"
    />
  );
}
