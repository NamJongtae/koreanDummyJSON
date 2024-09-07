import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetUserPosts() {
  return (
    <FetchSection
      id="유저-게시물-목록-조회하기"
      title="유저 게시물 목록 조회하기"
      endpoint="/users/:id/posts"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">유저의 게시물 목록을 조회합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium"> id</span>
            를 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/users/1/posts"
    />
  );
}
