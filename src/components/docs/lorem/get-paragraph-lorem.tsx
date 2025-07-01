import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetParagraphLorem() {
  return (
    <FetchSection
      id="문단-로렘-입숨-생성하기"
      title="문단 로렘 입숨 생성하기"
      endpoint="/lorem?mode=p&count=3&length=200"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">문단 로렘 입숨을 생성합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium">count, length</span>
            를 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/lorem?mode=p&count=3&length=200"
    />
  );
}
