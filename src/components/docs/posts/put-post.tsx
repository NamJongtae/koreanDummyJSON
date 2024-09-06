import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PutPost() {
  return (
    <FetchSection
      id="게시물-데이터-전체-수정하기"
      title="게시물 데이터 전체 수정하기"
      endpoint="/posts/:id"
      method="PUT"
      descriptions={
        <>
          <p className="section-text mb-2">게시물 데이터를 전체 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium">id </span>
            body의
            <span className="font-medium"> title, content, imgUrl</span>를
            변경해 보세요.
          </p>
        </>
      }
      body={{
        title: "JavaScript",
        content: "JavaScript is ...",
        imgUrl: "https://picsum.photos/id/2/300/300"
      }}
      fetchUrl="/posts/1"
    />
  );
}
