import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetTodos() {
  return (
    <FetchSection
      id="할-일-목록-조회하기"
      title="할 일 목록 조회하기"
      endpoint="/todos"
      method="GET"
      descriptions={
        <p className="section-text mb-4">전체 할 일 목록을 조회합니다.</p>
      }
      fetchUrl="/todos"
    />
  );
}
