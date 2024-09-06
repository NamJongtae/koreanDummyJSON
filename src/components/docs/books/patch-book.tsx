import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PatchBook() {
  return (
    <FetchSection
      id="책-데이터-일부-수정하기"
      title="책 데이터 일부 수정하기"
      endpoint="/books/:id"
      method="PATCH"
      descriptions={
        <>
          <p className="section-text mb-2">책 데이터 일부를 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의
            <span className="font-medium"> id 변경하거나</span>
            body의
            <span className="font-medium">
              {" "}
              author, genre, title, publicationDate, totalPage
            </span>
            를 추가/변경해 보세요.
          </p>
        </>
      }
      body={{
        genre: "프로그래밍",
        title: "프로그래밍에 대하여",
        totalPage: 220
      }}
      fetchUrl="/books/1"
    />
  );
}
