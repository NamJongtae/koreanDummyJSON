import FetchSection from "../commons/fetch-section/fetch-section";

export default function DeleteResource() {
  return (
    <FetchSection
      title="Resource 삭제하기"
      descriptions={
        <p className="section-text mb-4">id가 1인 게시물 삭제합니다.</p>
      }
      method="DELETE"
      fetchUrl="/posts/1"
    />
  );
}
