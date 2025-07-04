import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import useCopy from "@/src/hooks/commons/useCopy";
import CopyButton from "./copy-button";

interface IProps {
  jsdelivr: string;
}

export default function CDNExampleHtml({ jsdelivr }: IProps) {
  const htmlCode = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>korean-dummy-json-fetcher CDN 예제</title>
    ${jsdelivr}
  </head>
  <body>
    <script>
      // koreanDummyJsonFetcher에서 함수 사용
      document.body.innerHTML = '<p>Loading...</p>';
      window.koreanDummyJsonFetcher.getUsers().then(users => {
        document.body.innerHTML = '<pre>' + JSON.stringify(users, null, 2) + '</pre>';
      }).catch((error)=> {
        console.log(error);
      });
    </script>
  </body>
</html>
`;

  const { isCopied, handleCopy } = useCopy({
    target: htmlCode,
    timer: 1200
  });

  return (
    <>
      <div className="flex items-center justify-between mb-2 mt-10">
        <h3 className="section-text font-medium">CDN HTML 사용 예시</h3>
        <CopyButton isCopied={isCopied} onCopy={handleCopy} />
      </div>
      <SyntaxHighlighter
        language="html"
        style={oneLight}
        customStyle={{ marginBottom: "20px" }}
      >
        {htmlCode}
      </SyntaxHighlighter>
    </>
  );
}
