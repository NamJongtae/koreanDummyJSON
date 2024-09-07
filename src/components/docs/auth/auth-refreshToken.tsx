"use client";

import { useState } from "react";
import FetchSection from "../../commons/fetch-section/fetch-section";

export default function AuthRefreshToken() {
  const [token, setToekn] = useState("");

  const handleChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToekn(e.target.value);
  };

  return (
    <FetchSection
      className="mb-20"
      id="토큰-재발급하기"
      title="토큰 재발급하기"
      endpoint="/auth/refresh"
      method="GET"
      headers={{ Authorization: `Bearer ${token ? token : "토큰 입력"}` }}
      descriptions={
        <>
          <p className="section-text mb-2">
            refreshToken를 이용하여 accessToken를 재발급합니다.
          </p>
          <p className="section-text mb-4">
            위의 로그인 예시 코드를 실행한 후 발급 받은 refreshToken를 아래
            입력창에 입력해 주세요.
          </p>
        </>
      }
      fetchUrl="/auth/refresh"
    >
      <label className="hidden" htmlFor="token">
        토큰 입력
      </label>
      <input
        name="token"
        className="border px-4 py-2 mt-5 rounded-md"
        value={token}
        onChange={handleChangeToken}
        placeholder="refreshToken"
        autoComplete="off"
      />
    </FetchSection>
  );
}
