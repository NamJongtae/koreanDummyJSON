import React from "react";
import { render, screen } from "@testing-library/react";
import CodeSnippet from "@/src/components/commons/fetch-section/code-snippet";

jest.mock("react-syntax-highlighter", () => ({
  Prism: ({ children, language, style, customStyle, ...props }: any) => (
    <pre
      role="presentation"
      data-testid="syntax-highlighter"
      data-language={language}
      style={customStyle}
      {...props}
    >
      <code>{children}</code>
    </pre>
  )
}));
jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
  materialDark: {
    backgroundColor: "#263238",
    color: "#eeffff"
  }
}));

describe("CodeSnippet component test", () => {
  const code = `console.log("hello world");`;

  it("전달된 코드를 화면에 렌더링한다", () => {
    render(<CodeSnippet code={code} />);

    expect(screen.getByText('console.log("hello world");')).toBeInTheDocument();
  });

  it("프리즘 하이라이터가 적용되어 있는지 확인한다", () => {
    render(<CodeSnippet code={code} />);

    expect(screen.getByRole("presentation")).toBeInTheDocument();
    expect(screen.getByTestId("syntax-highlighter")).toBeInTheDocument();
  });

  it("자바스크립트 언어가 올바르게 설정되는지 확인한다", () => {
    render(<CodeSnippet code={code} />);

    const highlighter = screen.getByTestId("syntax-highlighter");
    expect(highlighter).toHaveAttribute("data-language", "javascript");
  });

  it("커스텀 스타일이 적용되는지 확인한다", () => {
    render(<CodeSnippet code={code} />);

    const highlighter = screen.getByTestId("syntax-highlighter");
    expect(highlighter).toHaveStyle("border-radius: 10px");
  });

  it("여러 줄 코드도 화면에 정상적으로 렌더링한다", () => {
    const code = `function example() {
  const message = "Hello, World!";
  console.log(message);
  return message;
  }`;

    render(<CodeSnippet code={code} />);

    expect(screen.getByText(/function example/)).toBeInTheDocument();
    expect(screen.getByText(/Hello, World!/)).toBeInTheDocument();
    expect(screen.getByText(/console\.log/)).toBeInTheDocument();
  });
});
