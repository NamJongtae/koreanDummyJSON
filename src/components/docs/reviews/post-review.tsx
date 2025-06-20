import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PostReview() {
  return (
    <FetchSection
      id="리뷰-생성하기"
      title="리뷰 생성하기"
      endpoint="/reviews"
      method="POST"
      descriptions={
        <>
          <p className="section-text mb-2">리뷰를 생성합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 body의{" "}
            <span className="font-medium">rating, content</span>를 변경해
            보세요.
          </p>
        </>
      }
      body={{
        userId: 1,
        bookId: 1,
        rating: 4,
        content: "흥미진진하고 재미있는 내용입니다."
      }}
      fetchUrl="/reviews"
    />
  );
}
