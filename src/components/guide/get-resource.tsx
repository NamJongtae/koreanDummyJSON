import FetchSection from '../commons/fetch-section/fetch-section';

export default function GetResource() {
  return (
    <FetchSection
      title="Resource 조회하기"
      descriptions={
        <p className="section-text mb-4">id가 1인 게시물을 조회합니다.</p>
      }
      method="GET"
      fetchUrl="/posts/1"
    />
  );
}
