import FetchSection from "../../commons/fetch-section/fetch-section";

export default function FilterUserPosts() {
  return (
    <FetchSection
      id="유저-게시물-목록-필터링하기"
      title="유저 게시물 목록 필터링하기"
      endpoint="/api/posts?userId={userId}"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">
            게시물 목록을 필터링하여 해당되는 유저의 게시물 목록을 조회합니다.
          </p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의
            <span className="font-medium"> userId</span>를 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/posts?userId=1"
    />
  );
}
