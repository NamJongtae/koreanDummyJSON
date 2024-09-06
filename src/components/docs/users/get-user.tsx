import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetUser() {
  return (
    <FetchSection
      id="유저-조회하기"
      title="유저 조회하기"
      endpoint="/users/:id"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">유저를 조회합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium">id</span>
            를 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/users/1"
    />
  );
}