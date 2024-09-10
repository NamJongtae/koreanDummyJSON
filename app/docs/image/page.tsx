"use client";

import SectionNavigator from "@/src/components/commons/section-navigator/section-navigator";
import DocsTemplate from "@/src/components/docs/docs-template";
import GetCustomBgColorImage from "@/src/components/docs/image/get-custom-bg-color-image";
import GetCustomExtImage from "@/src/components/docs/image/get-custom-ext-image";
import GetCustomSizeImage from "@/src/components/docs/image/get-custom-size-image";
import GetCustomTextColorImage from "@/src/components/docs/image/get-custom-text-color-image";
import GetCustomTextImage from "@/src/components/docs/image/get-custom-text-image";
import GetDefaultImage from "@/src/components/docs/image/get-default-image";

export default function DocsImage() {
  return (
    <DocsTemplate
      sectionIds={[
        "소개",
        "기본-이미지-생성하기",
        "이미지-사이즈-커스텀하기",
        "이미지-배경-색상-커스텀하기",
        "이미지-텍스트-색상-커스텀하기",
        "이미지-확장자-커스텀하기",
        "이미지-텍스트-커스텀하기"
      ]}
      SectionComponents={
        <>
          <GetDefaultImage />
          <GetCustomSizeImage />
          <GetCustomBgColorImage />
          <GetCustomTextImage />
          <GetCustomExtImage />
          <GetCustomTextColorImage />
        </>
      }
    />
  );
}
