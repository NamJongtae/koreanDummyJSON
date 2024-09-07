import Link from "next/link";
import FetchSection from "../../commons/fetch-section/fetch-section";

export default function AuthLogin() {
  return (
    <FetchSection
      id="로그인하기"
      title="로그인하기"
      endpoint="/auth/login"
      method="POST"
      descriptions={
        <>
          <p className="section-text mb-2">
            id, password를 받아 로그인을 처리합니다.
          </p>
          <p className="section-text mb-2">
            ATExp는 accessToken의 만료기간, RTExp는 RefreshToken의 만료기간으로
            sec(초) 단위입니다.
          </p>
          <p className="section-text mb-2">
            ATExp 기본값은 1시간, RTExp 기본값은 24시간입니다.
          </p>
          <p className="section-text mb-2">
            코드를 복사한 후{" "}
            <span className="font-medium">id, password, ATExp, RTExp</span>를
            직접 변경해 보세요.
          </p>
          <p className="section-text mb-4">
            코드를 실행하여 발급 받은 토큰을 <Link href={"https://jwt.io"} className='text-blue-600 betterhover:hover:underline underline-offset-4'>jwt.io</Link>에 접속하여 붙여 넣고 복호화해 보세요.
          </p>
        </>
      }
      body={{
        id: "test",
        password: "1234",
        ATExp: 10 * 60,
        RTExp: 60 * 60
      }}
      fetchUrl="/auth/login"
    />
  );
}
