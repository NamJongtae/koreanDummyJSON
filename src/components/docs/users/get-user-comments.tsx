import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetUserComments() {
  return (
    <FetchSection
      id="유저-댓글-목록-조회하기"
      title="유저 댓글 목록 조회하기"
      endpoint="/users/:id/comments"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">유저의 댓글 목록을 조회합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium"> id</span>
            를 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/users/1/comments"
    />
  );
}
