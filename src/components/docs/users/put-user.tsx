import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PutUser() {
  return (
    <FetchSection
      id="유저-데이터-전체-수정하기"
      title="유저 데이터 전체 수정하기"
      endpoint="/users/:id"
      method="PUT"
      descriptions={
        <>
          <p className="section-text mb-2">유저 데이터를 전체 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의
            <span className="font-medium">
              {" "}
              id, body의 username, email, phone, address
            </span>
            를 변경해 보세요.
          </p>
        </>
      }
      body={{
        username: "김영희",
        email: "kim456@gmail.com",
        phone: "010-1111-2222",
        address: "부산광역시 해운대구 우동 456-789"
      }}
      fetchUrl="/users/1"
    />
  );
}
