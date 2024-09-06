import FetchSection from '../../commons/fetch-section/fetch-section';

export default function DeleteUser() {
  return (
    <FetchSection
      className="mb-20"
      id="유저-삭제하기"
      title="유저 삭제하기"
      endpoint="/users/:id"
      method="DELETE"
      descriptions={
        <>
          <p className="section-text mb-2">유저를 삭제합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의<span className="font-medium"> id</span>
            를 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/users/1"
    />
  );
}
