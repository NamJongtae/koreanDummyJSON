import { render, screen, fireEvent } from "@testing-library/react";
import NpmCdnGuide from "@/src/components/home/start-guide/npm-cdn-guide";

jest.mock("@/src/hooks/home/useCdnLinks", () => ({
  useCdnLinks: () => ({
    jsdelivr: "https://cdn.jsdelivr.net/npm/korean-dummy-json-fetcher",
    unpkg: "https://unpkg.com/korean-dummy-json-fetcher"
  })
}));
const handleJsdelivrCopy = jest.fn();
const handleUnpkgCopy = jest.fn();
jest.mock("@/src/hooks/commons/useCopy", () => ({
  __esModule: true,
  default: (value: string) => {
    if (value.includes("jsdelivr")) {
      return { isCopied: false, handleCopy: handleJsdelivrCopy };
    }
    return { isCopied: true, handleCopy: handleUnpkgCopy };
  }
}));
jest.mock("@/src/components/commons/fetch-section/code-snippet", () => ({
  __esModule: true,
  default: (props: { code: string }) => (
    <div data-testid={`code-snippet-${props.code}`}>{props.code}</div>
  )
}));

describe("NpmCdnGuide component test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("안내 텍스트, NPM 링크, CDN 안내, jsDelivr/unpkg 버튼 및 코드가 모두 렌더링된다", () => {
    render(<NpmCdnGuide />);
    // 안내 텍스트
    expect(
      screen.getByText(/라이브러리를 설치하여 직접 비동기 API 호출 없이/)
    ).toBeInTheDocument();
    // NPM 링크
    const npmLink = screen.getByRole("link", {
      name: /Korean Dummy JSON Fetcher/
    });
    expect(npmLink).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/korean-dummy-json-fetcher"
    );
    // CDN 안내
    expect(
      screen.getByText(/아래 CDN 링크를 통해 라이브러리를 사용해보세요/)
    ).toBeInTheDocument();
    // jsDelivr
    expect(screen.getByText("jsDelivr")).toBeInTheDocument();
    expect(
      screen.getByTestId(
        "code-snippet-https://cdn.jsdelivr.net/npm/korean-dummy-json-fetcher"
      )
    ).toBeInTheDocument();
    // unpkg
    expect(screen.getByText("unpkg")).toBeInTheDocument();
    expect(
      screen.getByTestId(
        "code-snippet-https://unpkg.com/korean-dummy-json-fetcher"
      )
    ).toBeInTheDocument();
    // 버튼
    expect(
      screen.getAllByRole("button", { name: "복사" })[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "복사됨!" })[0]
    ).toBeInTheDocument();
  });

  it("jsDelivr 복사 버튼 클릭 시 handleJsdelivrCopy가 호출된다", () => {
    render(<NpmCdnGuide />);
    const jsdelivrBtn = screen.getAllByRole("button", { name: "복사" })[0];
    fireEvent.click(jsdelivrBtn);
    expect(handleJsdelivrCopy).toHaveBeenCalled();
  });

  it("unpkg 복사 버튼 클릭 시 handleUnpkgCopy가 호출된다", () => {
    render(<NpmCdnGuide />);
    const unpkgBtn = screen.getAllByRole("button", { name: "복사됨!" })[0];
    fireEvent.click(unpkgBtn);
    expect(handleUnpkgCopy).toHaveBeenCalled();
  });
});
