import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PatchTodo() {
  return (
    <FetchSection
      id="할-일-데이터-일부-수정하기"
      title="할 일 데이터 일부 수정하기"
      endpoint="/todos/:id"
      method="PATCH"
      descriptions={
        <>
          <p className="section-text mb-2">할 일 데이터를 일부 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의
            <span className="font-medium">id 변경하거나</span>
            body의
            <span className="font-medium"> content, completed</span>를
            추가/변경해 보세요.
          </p>
        </>
      }
      body={{ completed: true }}
      fetchUrl="/todos/1"
    />
  );
}
