import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetBook() {
  return (
    <FetchSection
      id="책-조회하기"
      title="책 조회하기"
      endpoint="/books/:id"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">책을 조회합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium"> id</span>
            를 변경해보세요.
          </p>
        </>
      }
      fetchUrl="/books/1"
    />
  );
}
