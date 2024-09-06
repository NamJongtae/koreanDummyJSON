import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetComment() {
  return (
    <FetchSection
      id="댓글-조회하기"
      title="댓글 조회하기"
      endpoint="/comments/:id"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">댓글을 조회합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium"> id</span>
            를 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/comments/1"
    />
  );
}
