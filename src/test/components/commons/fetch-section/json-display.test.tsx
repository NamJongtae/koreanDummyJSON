import React from "react";
import { render, screen } from "@testing-library/react";
import JsonDisplay from "@/src/components/commons/fetch-section/json-display";
import { DummyDataResonses } from "@/src/types/response-type";

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

describe("JsonDisplay component test", () => {
  it("data prop이 있을 때 JSON 문자열이 렌더링된다", () => {
    const data = { foo: "bar", num: 123 } as unknown as DummyDataResonses;
    render(<JsonDisplay data={data} />);
    expect(screen.getByText(/"foo": "bar"/)).toBeInTheDocument();
    expect(screen.getByText(/"num": 123/)).toBeInTheDocument();
  });

  it("data prop이 undefined일 때 빈 객체가 렌더링된다", () => {
    render(<JsonDisplay data={undefined as unknown as DummyDataResonses} />);
    expect(screen.getByText("{}", { exact: false })).toBeInTheDocument();
  });
});
