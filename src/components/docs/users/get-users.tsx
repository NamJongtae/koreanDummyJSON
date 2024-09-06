import FetchSection from "../../commons/fetch-section/fetch-section";
export default function GetUsers() {
  return (
    <FetchSection
      id="유저-목록-조회하기"
      title="유저 목록 조회하기"
      endpoint="/users"
      method="GET"
      descriptions={
        <p className="section-text mb-4">전체 유저 목록을 조회합니다.</p>
      }
      fetchUrl="/users"
    />
  );
}
