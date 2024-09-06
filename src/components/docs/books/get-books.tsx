import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetBooks() {
  return (
    <FetchSection
      id="책-목록-조회하기"
      title="책 목록 조회하기"
      endpoint="/books"
      method="GET"
      descriptions={
        <p className="section-text mb-4">전체 책 목록을 조회합니다.</p>
      }
      fetchUrl="/books"
    />
  );
}
