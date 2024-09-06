import FetchSection from "../../commons/fetch-section/fetch-section";

export default function PatchUser() {
  return (
    <FetchSection
      id="유저-데이터-일부-수정하기"
      title="유저 데이터 일부 수정하기"
      endpoint="/users/:id"
      method="PATCH"
      descriptions={
        <>
          <p className="section-text mb-2">유저 데이터를 일부 수정합니다.</p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의
            <span className="font-medium">id 변경하거나</span>
            body의
            <span className="font-medium">
              {" "}
              username, email, phone, address
            </span>
            를 추가/변경해 보세요.
          </p>
        </>
      }
      body={{
        username: "이민수",
        email: "lee67@gmail.com"
      }}
      fetchUrl="/users/1"
    />
  );
}
