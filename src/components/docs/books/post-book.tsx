import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PostBook() {
  return (
    <FetchSection
      id="책-생성하기"
      title="책 생성하기"
      endpoint="/books"
      method="POST"
      descriptions={
        <>
          <p className="section-text mb-2">책을 생성합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 body의
            <span className="font-medium">
              author, genre, title, publicationDate, totalPage
            </span>
            를 변경해 보세요.
          </p>
        </>
      }
      body={{
        author: "정재남",
        genre: "웹 프로그래밍",
        title: "코어 자바스크립트",
        publicationDate: "2019-09-10",
        totalPage: 202
      }}
      fetchUrl="/books"
    />
  );
}
