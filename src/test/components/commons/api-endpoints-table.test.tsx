import React from "react";
import { render, screen } from "@testing-library/react";
import ApiEndPointsTable from "@/src/components/commons/api-endpoints-table";

jest.mock("next/link", () => {
  const MockLink = ({
    href,
    children,
    prefetch,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    prefetch?: boolean;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("ApiEndPointsTable component test", () => {
  const data = [
    {
      endpoint: "users",
      url: "users",
      method: "GET",
      action: "유저 목록 조회"
    },
    { endpoint: "books/:id", method: "DELETE", action: "책 삭제" }
  ];

  it("테이블 헤더가 정상적으로 렌더링된다", () => {
    render(<ApiEndPointsTable data={data} />);
    expect(screen.getByText("Endpoint")).toBeInTheDocument();
    expect(screen.getByText("Method")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("각 테이블 row가 올바르게 렌더링된다", () => {
    render(<ApiEndPointsTable data={data} />);
    data.forEach((row) => {
      expect(screen.getByText(row.endpoint)).toBeInTheDocument();
      expect(screen.getByText(row.method)).toBeInTheDocument();
      expect(screen.getByText(row.action)).toBeInTheDocument();
    });
  });

  it("링크가 올바른 href를 가진다", () => {
    render(<ApiEndPointsTable data={data} />);
    expect(screen.getByText("users").closest("a")).toHaveAttribute(
      "href",
      "/api/users"
    );
    expect(screen.getByText("books/:id").closest("a")).toHaveAttribute(
      "href",
      "/api/books/:id"
    );
  });
});
