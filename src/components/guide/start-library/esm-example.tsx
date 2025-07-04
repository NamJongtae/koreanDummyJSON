import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import useCopy from "@/src/hooks/commons/useCopy";
import CopyButton from "./copy-button";

export default function ESMExample() {
  const code = `import { getUsers } from "korean-dummy-json-fetcher";
        
async function fetchUsers() {
  const users = await getUsers();
  console.log(users);
}

fetchUsers();`;

  const { isCopied, handleCopy } = useCopy({
    target: code,
    timer: 1200
  });

  return (
    <>
      <div className="flex items-center justify-between mb-2 mt-10">
        <h3 className="section-text font-medium">
          간단 사용 예시 (ESM/Node)
        </h3>
        <CopyButton isCopied={isCopied} onCopy={handleCopy} />
      </div>
      <SyntaxHighlighter
        language="typescript"
        style={oneLight}
        className="code-block mb-4"
      >
        {code}
      </SyntaxHighlighter>
    </>
  );
}
