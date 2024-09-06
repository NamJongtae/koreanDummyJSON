import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PostPost() {
  return (
    <FetchSection
      id="게시물-생성하기"
      title="게시물 생성하기"
      endpoint="/posts"
      method="POST"
      descriptions={
        <>
          <p className="section-text mb-2">게시물을 생성합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 body의{" "}
            <span className="font-medium">title, content, imgUrl</span>를 변경해
            보세요.
          </p>
        </>
      }
      body={{
        title: "테스트",
        content: "테스트 글 입니다.",
        imgUrl: "https://picsum.photos/id/1/300/300"
      }}
      fetchUrl="/posts"
    />
  );
}
