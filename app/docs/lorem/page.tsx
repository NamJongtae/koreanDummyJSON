import DocsTemplate from "@/src/components/docs/docs-template";
import GetDefaultLorem from "@/src/components/docs/lorem/get-default-lorem";
import GetParagraphLorem from "@/src/components/docs/lorem/get-paragraph-lorem";
import GetSentenceLorem from "@/src/components/docs/lorem/get-sentence-lorem";
import GetWordLorem from "@/src/components/docs/lorem/get-word-lorem";
import React from "react";

export default function LoremDocs() {
  return (
    <DocsTemplate
      SectionComponents={
        <>
          <GetDefaultLorem />
          <GetParagraphLorem />
          <GetSentenceLorem />
          <GetWordLorem />
        </>
      }
      sectionIds={[
        "소개",
        "기본-입숨-생성하기",
        "문단-입숨-생성하기",
        "문장-입숨-생성하기",
        "단어-입숨-생성하기"
      ]}
    />
  );
}
