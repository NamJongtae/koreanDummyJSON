import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetReviewBooks() {
  return (
    <FetchSection
      id="책-리뷰-목록-필터링하기"
      title="책 리뷰 목록 필터링하기"
      endpoint="/reviews?bookId={bookId}"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">
            {" "}
            리뷰 목록을 필터링하여 해당되는 책의 리뷰 목록을 조회합니다.
          </p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의{" "}
            <span className="font-medium"> bookId</span>를 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/reviews?bookId=1"
    />
  );
}
