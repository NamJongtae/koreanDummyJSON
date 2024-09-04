import { DummyDataResonses } from "@/src/types/response-type";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface IProps {
  data: DummyDataResonses;
}
function JsonDisplay({ data }: IProps) {
  return (
    <SyntaxHighlighter
      customStyle={{
        borderRadius: "10px",
        maxHeight: "500px",
        overflow: "auto"
      }}
      language="json"
      style={materialDark}
    >
      {JSON.stringify(data ? data : {}, null, 2)}
    </SyntaxHighlighter>
  );
}

export default JsonDisplay;
