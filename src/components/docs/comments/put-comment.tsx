import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PutComment() {
  return (
    <FetchSection
      id="댓글-데이터-전체-수정하기"
      title="댓글 데이터 전체 수정하기"
      endpoint="/comments/:id"
      method="PUT"
      descriptions={
        <>
          <p className="section-text mb-2">댓글 데이터를 전체 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의{" "}
            <span className="font-medium">id를 </span>
            body의
            <span className="font-medium"> content</span>를 변경해 보세요.
          </p>
        </>
      }
      body={{
        content: "좋은 글 이네요."
      }}
      fetchUrl="/comments/1"
    />
  );
}
