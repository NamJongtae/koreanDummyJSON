import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PatchPost() {
  return (
    <FetchSection
      id="게시물-데이터-일부-수정하기"
      title="게시물 데이터 일부 수정하기"
      endpoint="/posts/:id"
      method="PATCH"
      descriptions={
        <>
          <p className="section-text mb-2">게시물 데이터 일부를 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의
            <span className="font-medium">id 변경하거나</span>
            body의
            <span className="font-medium"> title, content, imgUrl</span>를
            추가/변경해 보세요.
          </p>
        </>
      }
      body={{ title: "가입 인사", content: "안녕하세요. 반갑습니다." }}
      fetchUrl="/posts/1"
    />
  );
}
