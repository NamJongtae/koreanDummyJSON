import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PostUser() {
  return (
    <FetchSection
      id="유저-생성하기"
      title="유저 생성하기"
      endpoint="/users/:id"
      method="POST"
      descriptions={
        <>
          <p className="section-text mb-2">유저를 생성합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 body의
            <span className="font-medium">
              {" "}
              username, email, phone, address
            </span>
            를 변경해 보세요.
          </p>
        </>
      }
      body={{
        username: "김철수",
        email: "kim123@gmail.com",
        phone: "010-1234-5678",
        address: "서울특별시 강남구 테헤란로 123"
      }}
      fetchUrl="/users"
    />
  );
}
