import FetchSection from "../commons/fetch-section/fetch-section";

export default function PatchResource() {
  return (
    <FetchSection
      id="Resource-일부-수정하기"
      title="Resource 일부 수정하기"
      descriptions={
        <p className="section-text mb-4">
          id가 1인 게시물을 일부를 수정합니다.
        </p>
      }
      method="PATCH"
      body={{ title: "테스트 글" }}
      fetchUrl="/posts/1"
    />
  );
}
