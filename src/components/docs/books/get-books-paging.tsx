import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetBooksPaging() {
  return (
    <FetchSection
      id="책-목록-페이징"
      title="책 목록 페이징"
      endpoint="/books?page={page}&limit={limit}"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">
            전체 책 목록을 페이징 처리하여 조회합니다.
          </p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의{" "}
            <span className="font-medium">page</span>와
            <span className="font-medium">limit</span>을 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/books?page=1&limit=10"
    />
  );
}
