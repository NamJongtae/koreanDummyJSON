import FetchSection from '../commons/fetch-section/fetch-section';

export default function PutResource() {
  return (
    <FetchSection
      title="Resource 전체 수정하기"
      descriptions={
        <p className="section-text mb-4">id가 1인 게시물 전체를 수정합니다.</p>
      }
      method="PUT"
      body={{
        title: "테스트 글",
        contnet: "테스트 글 입니다.",
        imgUrl: "https://picsum.photos/id/2/300/300"
      }}
      fetchUrl="/posts/1"
    />
  );
}
