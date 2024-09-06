import FetchSection from "../../commons/fetch-section/fetch-section";

export default function FilterReviewUser() {
  return (
    <FetchSection
      id="유저-리뷰-목록-필터링하기"
      title="유저 리뷰 목록 필터링하기"
      endpoint="/reviews?userId={userId}"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">
            {" "}
            리뷰 목록을 필터링하여 해당되는 유저의 리뷰 목록을 조회합니다.
          </p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의{" "}
            <span className="font-medium"> userId</span>를 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/reviews?userId=1"
    />
  );
}
