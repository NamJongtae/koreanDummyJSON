import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PostComment() {
  return (
    <FetchSection
      id="댓글-생성하기"
      title="댓글 생성하기"
      endpoint="/comments"
      method="POST"
      descriptions={
        <>
          <p className="section-text mb-2">댓글을 생성합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 body의 <span className="font-medium">content</span>
            를 변경해 보세요.
          </p>
        </>
      }
      body={{
        content: "테스트 댓글 입니다."
      }}
      fetchUrl="/comments"
    />
  );
}
