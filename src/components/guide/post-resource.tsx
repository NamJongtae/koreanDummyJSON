import FetchSection from "../commons/fetch-section/fetch-section";

export default function PostResource() {
  return (
    <FetchSection
      id="Resource-생성하기"
      title="Resource 생성하기"
      descriptions={
        <p className="section-text mb-4">새로운 게시물을 생성합니다.</p>
      }
      method="POST"
      body={{
        title: "테스트 글",
        content: "테스트 글 입니다.",
        imgUrl: "https://picsum.photos/id/1/300/300",
        userId: 1
      }}
      fetchUrl="/posts"
    />
  );
}
