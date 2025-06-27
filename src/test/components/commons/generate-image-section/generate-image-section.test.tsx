import React from "react";
import { render, screen } from "@testing-library/react";
import GenerateImageSection from "@/src/components/commons/generate-image-section/generate-image-section";

jest.mock("@/src/hooks/commons/useGenerateImage", () => () => ({
  generateImage: true,
  handleClickGenerateImage: jest.fn()
}));
jest.mock("@/src/lib/generateCodeSnippet", () => ({
  generateCodeSnippet: () => "console.log('mock code');"
}));
jest.mock("@/src/components/commons/fetch-section/code-snippet", () => {
  const MockCodeSnippet = ({ code }: { code: string }) => <pre>{code}</pre>;
  MockCodeSnippet.displayName = "MockCodeSnippet";
  return MockCodeSnippet;
});
jest.mock("@/src/components/commons/fetch-section/copy-btn", () => {
  const MockCopyBtn = () => <button>Copy</button>;
  MockCopyBtn.displayName = "MockCopyBtn";
  return MockCopyBtn;
});
jest.mock(
  "@/src/components/commons/generate-image-section/generate-image-btn",
  () => {
    const MockGenerateImageBtn = ({
      generateImage
    }: {
      generateImage: () => void;
    }) => <button onClick={generateImage}>이미지 생성</button>;
    MockGenerateImageBtn.displayName = "MockGenerateImageBtn";
    return MockGenerateImageBtn;
  }
);
jest.mock("next/image", () => {
  const MockImage = (props: {
    src: string;
    alt: string;
    width: number;
    height: number;
    unoptimized: boolean;
  }) => {
    const { unoptimized, ...rest } = props;
    return <img {...rest} />;
  };
  MockImage.displayName = "MockImage";
  return MockImage;
});

describe("GenerateImageSection component test", () => {
  it("필수 정보와 주요 UI가 정상적으로 렌더링된다", () => {
    render(
      <GenerateImageSection
        title="이미지 생성"
        endpoint="/image"
        method="GET"
        descriptions={<div>설명입니다</div>}
        fetchUrl="/image?size=200x100"
      >
        <div>children</div>
      </GenerateImageSection>
    );

    expect(
      screen.getByRole("heading", { name: "이미지 생성" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, node) => node?.textContent === "Endpoint : /image"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, node) => node?.textContent === "Method : GET")
    ).toBeInTheDocument();
    expect(screen.getByText("설명입니다")).toBeInTheDocument();
    expect(screen.getByText("console.log('mock code');")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "이미지 생성" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    // 이미지가 렌더링되는지 확인
    expect(screen.getByRole("presentation")).toBeInTheDocument();
    expect(screen.getByRole("presentation")).toHaveAttribute("width", "200");
    expect(screen.getByRole("presentation")).toHaveAttribute("height", "100");
    // 자식 컴포넌트 렌더링되는지 확인
    expect(screen.getByText("children")).toBeInTheDocument();
  });
});
