import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PutTodo() {
  return (
    <FetchSection
      id="할-일-데이터-전체-수정하기"
      title="할 일 데이터 전체 수정하기"
      endpoint="/todos/:id"
      method="PUT"
      descriptions={
        <>
          <p className="section-text mb-2">할 일 데이터를 전체 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의 <span className="font-medium">id </span>
            body의
            <span className="font-medium"> content, completed</span>를 변경해
            보세요.
          </p>
        </>
      }
      body={{ content: "운동하기", completed: true }}
      fetchUrl="/todos/1"
    />
  );
}
