import { render, screen } from "@testing-library/react";
import HomeIntroDescription from "@/src/components/home/home-intro/home-intro-description";

describe("HomeIntroDescription component test", () => {
  it("모든 설명 텍스트와 링크, sr-only 태그가 올바르게 렌더링된다", () => {
    render(<HomeIntroDescription />);
    // 주요 설명 텍스트
    expect(screen.getByText("Korean Dummy JSON")).toBeInTheDocument();
    expect(
      screen.getByText(
        /한국어 기반의 더미 데이터를 제공하기 위해 제작된 프로젝트/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /한국어로 구성된 데이터를 통해 개발자들이 보다 현실적인 더미 데이터를 제공 받을 수 있습니다/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /추가로 JWT 기반 로그인 및 인증\/인가 더미 API 및 동적 더미 이미지 API가 제공됩니다/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /한글 로렘 입숨 API와 한글 로렘 생성기 기능이 새롭게 추가되었습니다. API를 직접 사용하지 않아도 LOREM 페이지에서 한글 로렘 입숨을 바로 만들 수 있습니다. 문단, 문장, 단어 모드를 선택하고 원하는 개수와 글자 수를 지정해 한글 로렘 입숨을 생성해보세요./
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /GET, POST, PUT, PATCH, DELETE 요청을 보내고 직접 테스트 해보고 학습해 보세요/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /라이브러리를 통해 직접 비동기 API 호출 없이 더미 데이터를 쉽게 사용할 수 있습니다/
      )
    ).toBeInTheDocument();

    // JSONPlaceholder 링크
    const jsonPlaceholderLink = screen.getByRole("link", {
      name: /JSONPlaceholder/
    });
    expect(jsonPlaceholderLink).toHaveAttribute(
      "href",
      "https://jsonplaceholder.typicode.com/"
    );

    // Korean Dummy JSON Fetcher 링크
    const fetcherLink = screen.getByRole("link", {
      name: /Korean Dummy JSON Fetcher/
    });
    expect(fetcherLink).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/korean-dummy-json-fetcher"
    );

    // sr-only 태그
    expect(
      screen.getByText(
        "#korean json, #dummy json, #한국어 더미 데이터, #한글 로렘 생성기, #한글 로렘 입숨, #로렘 생성기"
      )
    ).toBeInTheDocument();
  });
});
