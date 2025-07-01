import React from "react";
import FetchSection from "../../commons/fetch-section/fetch-section";

export default function GetDefaultLorem() {
  return (
    <FetchSection
      id="기본-로렘-입숨-생성하기"
      title="기본 로렘 입숨 생성하기"
      endpoint="/lorem"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">기본 로렘 입숨을 생성합니다.</p>
          <p className="section-text mb-2 font-medium">기본 로렘 입숨은 문단(mode: p), 2문단(count: 2), 200자(length: 200) 입니다.</p>
        </>
      }
      fetchUrl="/lorem"
    />
  );
}
