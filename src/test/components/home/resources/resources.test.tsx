import { render, screen } from "@testing-library/react";
import Resources from "@/src/components/home/resources/resources";
import { useSectionVisibility } from "@/src/hooks/commons/useSectionVisibility";

jest.mock("@/src/hooks/commons/useSectionVisibility", () => ({
  useSectionVisibility: jest.fn()
}));
jest.mock("@/src/components/home/resources/resources-rows", () => ({
  __esModule: true,
  default: ({ resource, info }: { resource: string; info: string }) => (
    <tr data-testid="mock-row">
      <td>{resource}</td>
      <td>{info}</td>
    </tr>
  )
}));
jest.mock("@/src/table-data/resources-data", () => ({
  RESOURCES_DATA: [
    { resource: "/users", info: "유저 목록 반환" },
    { resource: "/posts", info: "게시글 목록 반환" }
  ]
}));

describe("Resources 컴포넌트", () => {
  const mockRef = { current: null };
  beforeEach(() => {
    (useSectionVisibility as jest.Mock).mockImplementation(() => ({
      ref: mockRef,
      isVisible: true
    }));
  });

  it("섹션, 제목, 설명, 테이블 헤더, row가 모두 렌더링된다", () => {
    render(<Resources />);
    // 섹션 제목
    expect(
      screen.getByRole("heading", { name: "Resources" })
    ).toBeInTheDocument();
    // 설명
    expect(
      screen.getByText(
        /users, posts, comments, todos, books, reviews, auth, image 8개의 리소스가 제공됩니다/
      )
    ).toBeInTheDocument();
    // 테이블 헤더
    expect(screen.getByText("Resource")).toBeInTheDocument();
    expect(screen.getByText("Information")).toBeInTheDocument();
    // rows
    const rows = screen.getAllByTestId("mock-row");
    expect(rows.length).toBe(2);
    expect(rows[0]).toHaveTextContent("/users");
    expect(rows[0]).toHaveTextContent("유저 목록 반환");
    expect(rows[1]).toHaveTextContent("/posts");
    expect(rows[1]).toHaveTextContent("게시글 목록 반환");
  });

  it("isVisible 값에 따라 opacity/translate 클래스가 올바르게 적용된다", () => {
    // isVisible: false
    (useSectionVisibility as jest.Mock).mockImplementation(() => ({
      ref: mockRef,
      isVisible: false
    }));
    const { container, rerender } = render(<Resources />);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("opacity-0");
    expect(section.className).toContain("translate-y-[150px]");

    // isVisible: true
    (useSectionVisibility as jest.Mock).mockImplementation(() => ({
      ref: mockRef,
      isVisible: true
    }));
    rerender(<Resources />);
    expect(section.className).toContain("opacity-100");
    expect(section.className).toContain("translate-y-0");
  });

  it("section 태그에 useSectionVisibility의 ref가 전달되는지 확인한다", () => {
    const { container } = render(<Resources />);
    const section = container.querySelector("section");
    expect(mockRef.current).toBe(section);
  });
});
