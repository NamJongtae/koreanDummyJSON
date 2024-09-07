import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetTodo() {
  return (
    <FetchSection
      id="할-일-조회하기"
      title="할 일 조회하기"
      endpoint="/todos/:id"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">할 일을 조회합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의<span className="font-medium"> id</span>
            를 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/todos/1"
    />
  );
}
