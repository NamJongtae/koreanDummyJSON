"use client";

import FetchSection from "../../commons/fetch-section/fetch-section";
import { useState } from "react";

export default function AuthGetUser() {
  const [token, setToekn] = useState("");

  const handleChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToekn(e.target.value);
  };

  return (
    <FetchSection
      id="유저-조회하기"
      title="유저 조회하기"
      endpoint="/auth/user"
      method="GET"
      headers={{ Authorization: `Bearer ${token ? token : "토큰 입력"}` }}
      descriptions={
        <>
          <p className="section-text mb-2">
            accessToken를 통해 유저 조회합니다.
          </p>
          <p className="section-text mb-4">
            위의 로그인 예시 코드를 실행한 후 발급 받은 accessToken를 아래
            입력창에 입력해 주세요.
          </p>
        </>
      }
      fetchUrl="/auth/user"
    >
      <label className="hidden" htmlFor="token">
        토큰 입력
      </label>
      <input
        name="token"
        className="border px-4 py-2 mt-5 rounded-md"
        value={token}
        onChange={handleChangeToken}
        placeholder="accessToken"
        autoComplete="off"
      />
    </FetchSection>
  );
}
