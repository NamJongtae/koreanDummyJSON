import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetUserTodos() {
  return (
    <FetchSection
      id="유저-할-일-목록-조회하기"
      title="유저 할 일 목록 조회하기"
      endpoint="/users/:id/todos"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">유저의 할 일 목록을 조회합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium"> id</span>
            를 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/users/1/todos"
    />
  );
}
