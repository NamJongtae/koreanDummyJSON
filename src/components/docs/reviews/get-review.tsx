import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetReview() {
  return (
    <FetchSection
      id="리뷰-조회하기"
      title="리뷰 조회하기"
      endpoint="/reviews/:id"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">리뷰를 조회합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium"> id</span>
            를 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/reviews/1"
    />
  );
}
