"use client";

import PlayCode from "./play-code";

export default function TryIt() {
  return (
    <section className={" mt-20 px-4"}>
      <h2 className="section-title">직접 테스트 해보세요</h2>
      <p className="section-text mb-5">
        👇 아래 Endpoint를 선택하고 코드를 실행하여 데이터를 조회해보세요.
      </p>
      <PlayCode />
    </section>
  );
}
