import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetPost() {
  return (
    <FetchSection
      id="게시물-조회하기"
      title="게시물 조회하기"
      endpoint="/posts/:id"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">게시물을 조회합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium"> id</span>
            를 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/posts/1"
    />
  );
}
