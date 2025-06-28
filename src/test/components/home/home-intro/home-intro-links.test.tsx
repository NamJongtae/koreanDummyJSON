
import { render, screen } from "@testing-library/react";import HomeIntroLinks from "@/src/components/home/home-intro/home-intro-links";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => (
    <img data-testid="mock-image" {...props} />
  )
}));

describe("HomeIntroLinks component test", () => {
  it("GitHub, NPM 링크와 아이콘이 올바르게 렌더링된다", () => {
    render(<HomeIntroLinks />);
  
    const githubLink = screen.getByRole("link", { name: /GitHub/ });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/NamJongtae/korean_dummy_JSON"
    );

    const npmLink = screen.getByRole("link", {
      name: /Korean Dummy JSON Fetcher/
    });
    expect(npmLink).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/korean-dummy-json-fetcher"
    );

    const images = screen.getAllByTestId("mock-image");

    expect(images[0]).toHaveAttribute("src", "/icons/github-icon.svg");
    expect(images[0]).toHaveAttribute("alt", "");
    expect(images[0]).toHaveAttribute("width", "32");
    expect(images[0]).toHaveAttribute("height", "32");
    expect(images[1]).toHaveAttribute("src", "/icons/npm-icon.svg");
    expect(images[1]).toHaveAttribute("alt", "");
    expect(images[1]).toHaveAttribute("width", "26");
    expect(images[1]).toHaveAttribute("height", "26");
  });
});
