import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PutReview() {
  return (
    <FetchSection
      id="리뷰-데이터-전체-수정하기"
      title="리뷰 데이터 전체 수정하기"
      endpoint="/reviews/:id"
      method="PUT"
      descriptions={
        <>
          <p className="section-text mb-2">리뷰 데이터를 전체 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium">id </span>
            body의
            <span className="font-medium"> rating, content</span>를 변경해
            보세요.
          </p>
        </>
      }
      body={{
        rating: 3,
        content: "괜찮은 내용입니다."
      }}
      fetchUrl="/reviews/1"
    />
  );
}
