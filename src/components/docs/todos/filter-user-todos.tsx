import FetchSection from "../../commons/fetch-section/fetch-section";

export default function FilterUserTodos() {
  return (
    <FetchSection
      id="할-일-목록-필터링하기"
      title="할 일 목록 필터링하기"
      endpoint="/api/todos?userId={userId}"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">
            할 일 목록을 필터링하여 해당되는 유저의 할 일 목록을 조회합니다.
          </p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의
            <span className="font-medium"> userId</span>를 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/todos?userId=1"
    />
  );
}
