import FetchSection from '../commons/fetch-section/fetch-section';

export default function GetResources() {
  return (
    <FetchSection
      title='Resource 목록 조회하기'
      descriptions={
        <p className='section-text mb-4'>모든 게시물을 조회합니다.</p>
      }
      method='GET'
      fetchUrl='/posts'
    />
  );
}
