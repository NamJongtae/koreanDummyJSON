import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetTodosPaging() {
  return (
    <FetchSection
      id="할-일-목록-페이징"
      title="할 일 목록 페이징"
      endpoint="/todos?page={page}&limit={limit}"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">
            전체 할 일 목록을 페이징 처리하여 조회합니다.
          </p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의{" "}
            <span className="font-medium">page</span>와
            <span className="font-medium">limit</span>을 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/todos?page=1&limit=10"
    />
  );
}
