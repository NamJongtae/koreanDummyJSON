import AuthGetUser from "@/src/components/docs/auth/auth-get-user";
import AuthLogin from "@/src/components/docs/auth/auth-login";
import AuthRefreshToken from "@/src/components/docs/auth/auth-refreshToken";
import DocsTemplate from "@/src/components/docs/docs-template";

export default function AuthDocs() {
  return (
    <DocsTemplate
      SectionComponents={
        <>
          <AuthLogin />
          <AuthGetUser/>
          <AuthRefreshToken />
        </>
      }
      sectionIds={["소개", "로그인하기", "유저-조회하기", "토큰-재발급하기"]}
    />
  );
}
