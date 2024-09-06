import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetCommentsPaging() {
  return (
    <FetchSection
      id="댓글-목록-페이징"
      title="댓글 목록 페이징"
      endpoint="/comments?page={page}&limit={limit}"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">
            전체 댓글 목록을 페이징 처리하여 조회합니다.
          </p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의{" "}
            <span className="font-medium">page</span>와
            <span className="font-medium">limit</span>을 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/comments?page=1&limit=10"
    />
  );
}
