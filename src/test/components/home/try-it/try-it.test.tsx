import { render, screen } from "@testing-library/react";
import TryIt from "@/src/components/home/try-it/try-it";

jest.mock("@/src/components/home/try-it/play-code", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-play-code" />
}));

describe("TryIt 컴포넌트", () => {
  it("제목, 설명, PlayCode가 모두 렌더링된다", () => {
    render(<TryIt />);
    expect(
      screen.getByRole("heading", { name: "직접 테스트 해보세요" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /아래 Endpoint를 선택하고 코드를 실행하여 데이터를 조회해보세요/
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-play-code")).toBeInTheDocument();
  });
});
