import { render, screen } from "@testing-library/react";
import ResourcesRows from "@/src/components/home/resources/resources-rows";

describe("ResourcesRows component test", () => {
  it("resource, info가 올바르게 렌더링되고, 링크 속성이 정상적으로 적용된다", () => {
    const resource = "/users";
    const info = "유저 20명";
    render(
      <table>
        <tbody>
          <ResourcesRows resource={resource} info={info} />
        </tbody>
      </table>
    );

    // 링크 확인
    const link = screen.getByRole("link", { name: resource });
    expect(link).toHaveAttribute("href", `/api${resource}`);
    expect(link).toHaveAttribute("target", "_blank");

    // info 텍스트 확인
    expect(screen.getByText(info)).toBeInTheDocument();
  });
});
