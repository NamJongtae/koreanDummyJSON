import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PatchReview() {
  return (
    <FetchSection
      id="리뷰-데이터-일부-수정하기"
      title="리뷰 데이터 일부 수정하기"
      endpoint="/reviews/:id"
      method="PATCH"
      descriptions={
        <>
          <p className="section-text mb-2">리뷰 데이터 일부를 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의
            <span className="font-medium">id 변경하거나</span>
            body의
            <span className="font-medium"> rating, content</span>를 추가/변경해
            보세요.
          </p>
        </>
      }
      body={{ content: "재밌는 책입니다." }}
      fetchUrl="/reviews/1"
    />
  );
}
