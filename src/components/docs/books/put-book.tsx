import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PutBook() {
  return (
    <FetchSection
      id="책-데이터-전체-수정하기"
      title="책 데이터 전체 수정하기"
      endpoint="/books/:id"
      method="PUT"
      descriptions={
        <>
          <p className="section-text mb-2">책 데이터를 전체 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의<span className="font-medium">id </span>
            body의
            <span className="font-medium">
              {" "}
              author, genre, title, publicationDate, totalPage
            </span>
            를 변경해 보세요.
          </p>
        </>
      }
      body={{
        author: "이응모",
        genre: "웹 프로그래밍",
        title: "모던 자바스크립트 Deep Dive",
        publicationDate: "2020-09-25",
        totalPage: 956
      }}
      fetchUrl="/books/1"
    />
  );
}
