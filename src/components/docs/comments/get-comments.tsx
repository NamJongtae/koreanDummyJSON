import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetComments() {
  return (
    <FetchSection
      id="댓글-목록-조회하기"
      title="댓글 목록 조회하기"
      endpoint="/comments"
      method="GET"
      descriptions={
        <p className="section-text mb-4">전체 댓글 목록을 조회합니다.</p>
      }
      fetchUrl="/comments"
    />
  );
}
