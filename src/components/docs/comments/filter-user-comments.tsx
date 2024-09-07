import FetchSection from "../../commons/fetch-section/fetch-section";

export default function FilterUserComments() {
  return (
    <FetchSection
      id="유저-댓글-목록-필터링하기"
      title="유저 댓글 목록 필터링하기"
      endpoint="/api/comments?userId={userId}"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">
            댓글 목록을 필터링하여 해당되는 유저의 댓글 목록을 조회합니다.
          </p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의
            <span className="font-medium"> userId</span>를 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/comments?userId=1"
    />
  );
}
