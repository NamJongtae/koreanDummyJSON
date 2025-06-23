import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PostTodo() {
  return (
    <FetchSection
      id="할-일-생성하기"
      title="할 일 생성하기"
      endpoint="/todos"
      method="POST"
      body={{ content: "할 일 내용" }}
      descriptions={
        <>
          <p className="section-text mb-2">할 일을 생성합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 body의
            <span className="font-medium"> content</span>를 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/todos"
    />
  );
}
