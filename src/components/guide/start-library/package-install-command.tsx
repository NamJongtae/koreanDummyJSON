import useCopy from "@/src/hooks/commons/useCopy";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./copy-button";

interface IProps {
  manager: "npm" | "yarn" | "pnpm";
}

const npmCode = `npm install korean-dummy-json-fetcher`;
const yarnCode = `yarn add korean-dummy-json-fetcher`;
const pnpmCode = `pnpm add korean-dummy-json-fetcher`;

const codeMapper = {
  npm: npmCode,
  yarn: yarnCode,
  pnpm: pnpmCode
};



export default function PackageInstallCommand({ manager }: IProps) {
  const code = codeMapper[manager];
  const { isCopied, handleCopy } = useCopy({
    target: code,
    timer: 1200
  });

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h3 className="section-text font-medium mb-2">{manager}</h3>
        <CopyButton isCopied={isCopied} onCopy={handleCopy} />
      </div>

      <SyntaxHighlighter
        language="bash"
        style={oneLight}
        customStyle={{ marginBottom: 20, marginTop: 0 }}
      >
        {code}
      </SyntaxHighlighter>
    </>
  );
}
