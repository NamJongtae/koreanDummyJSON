import FetchSection from "../../commons/fetch-section/fetch-section";

export default function DeleteBook() {
  return (
    <FetchSection
      className="mb-20"
      id="책-삭제하기"
      title="책 삭제하기"
      endpoint="/books/:id"
      method="DELETE"
      descriptions={
        <>
          <p className="section-text mb-2">책을 삭제합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium">id</span>
            를 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/books/1"
    />
  );
}
