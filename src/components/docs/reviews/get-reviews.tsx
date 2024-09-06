import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetReviews() {
  return (
    <FetchSection
      id="리뷰-목록-조회하기"
      title="리뷰 목록 조회하기"
      endpoint="/reviews"
      method="GET"
      descriptions={
        <p className="section-text mb-4">전체 리뷰 목록을 조회합니다.</p>
      }
      fetchUrl="/reviews"
    />
  );
}
