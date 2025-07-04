import { render, screen } from "@testing-library/react";
import Resources from "@/src/components/home/resources/resources";

jest.mock("@/src/components/home/resources/resources-rows", () => ({
  __esModule: true,
  default: ({ resource, info }: { resource: string; info: string }) => (
    <tr data-testid="mock-row">
      <td>{resource}</td>
      <td>{info}</td>
    </tr>
  )
}));

describe("Resources 컴포넌트", () => {

  it("섹션, 제목, 설명, 테이블 헤더, row가 모두 렌더링된다", () => {
    render(<Resources />);
    // 섹션 제목
    expect(
      screen.getByRole("heading", { name: "Resources" })
    ).toBeInTheDocument();
    // 설명
    expect(
      screen.getByText(
        /users, posts, comments, todos, books, reviews, auth, image, lorem 9개의 리소스가 제공됩니다/
      )
    ).toBeInTheDocument();
    // 테이블 헤더
    expect(screen.getByText("Resource")).toBeInTheDocument();
    expect(screen.getByText("Information")).toBeInTheDocument();
    // rows
    const rows = screen.getAllByTestId("mock-row");
    expect(rows.length).toBe(9);
    expect(rows[0]).toHaveTextContent("/users");
    expect(rows[0]).toHaveTextContent("유저 20명");
    expect(rows[1]).toHaveTextContent("/posts");
    expect(rows[1]).toHaveTextContent("게시물 100개");
    expect(rows[2]).toHaveTextContent("/comments");
    expect(rows[2]).toHaveTextContent("댓글 500개");
    expect(rows[3]).toHaveTextContent("/todos");
    expect(rows[3]).toHaveTextContent("할 일 200개");
    expect(rows[4]).toHaveTextContent("/books");
    expect(rows[4]).toHaveTextContent("책 100개");
    expect(rows[5]).toHaveTextContent("/reviews");
    expect(rows[5]).toHaveTextContent("리뷰 500개");
    expect(rows[6]).toHaveTextContent("/auth");
    expect(rows[6]).toHaveTextContent("로그인 및 인증/인가");
    expect(rows[7]).toHaveTextContent("/image");
    expect(rows[7]).toHaveTextContent("동적 이미지 생성");
    expect(rows[8]).toHaveTextContent("/lorem");
    expect(rows[8]).toHaveTextContent("한글 로렘 입숨 생성");
  });
});
