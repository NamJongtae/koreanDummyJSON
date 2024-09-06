import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetPosts() {
  return (
    <FetchSection
      id="게시물-목록-조회하기"
      title="게시물 목록 조회하기"
      endpoint="/posts"
      method="GET"
      descriptions={
        <p className="section-text mb-4">전체 게시물 목록을 조회합니다.</p>
      }
      fetchUrl="/posts"
    />
  );
}
