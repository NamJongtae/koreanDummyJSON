import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PatchComment() {
  return (
    <FetchSection
      id="댓글-데이터-일부-수정하기"
      title="댓글 데이터 일부 수정하기"
      endpoint="/comments/:id"
      method="PATCH"
      descriptions={
        <>
          <p className="section-text mb-2">댓글 데이터 일부를 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의
            <span className="font-medium"> id</span>를 변경하거나 body의
            <span className="font-medium"> content</span>를 변경해 보세요.
          </p>
        </>
      }
      body={{ content: "안녕하세요. 반갑습니다." }}
      fetchUrl="/comments/1"
    />
  );
}
