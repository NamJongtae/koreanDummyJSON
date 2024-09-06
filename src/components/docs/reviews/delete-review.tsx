import FetchSection from "../../commons/fetch-section/fetch-section";

export default function DeleteReview() {
  return (
    <FetchSection
      className="mb-20"
      id="리뷰-삭제하기"
      title="리뷰 삭제하기"
      endpoint="/reviews/:id"
      method="DELETE"
      descriptions={
        <>
          <p className="section-text mb-2">리뷰를 삭제합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium">id</span>
            를 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/reviews/1"
    />
  );
}
