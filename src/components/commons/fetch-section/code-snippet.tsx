import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface IProps {
  code: string;
}

function CodeSnippet({ code }: IProps) {
  return (
    <SyntaxHighlighter
      customStyle={{ borderRadius: "10px" }}
      language="javascript"
      style={materialDark}
    >
      {code}
    </SyntaxHighlighter>
  );
}

export default CodeSnippet;
