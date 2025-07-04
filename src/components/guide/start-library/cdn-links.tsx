import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./copy-button";
import useCopy from "@/src/hooks/commons/useCopy";

interface IProps {
  jsdelivr: string;
  unpkg: string;
}

export default function CDNLinks({ jsdelivr, unpkg }: IProps) {
  const { isCopied: isJsdelivrCopied, handleCopy: handleJsdelivrCopy } =
    useCopy({
      target: jsdelivr,
      timer: 1200
    });
  const { isCopied: isUnpkgCopied, handleCopy: handleUnpkgCopy } = useCopy({
    target: unpkg,
    timer: 1200
  });

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm">jsdelivr</div>
        <CopyButton isCopied={isJsdelivrCopied} onCopy={handleJsdelivrCopy} />
      </div>
      <SyntaxHighlighter
        language="html"
        style={oneLight}
        customStyle={{ marginBottom: 20, marginTop: 0 }}
      >
        {jsdelivr}
      </SyntaxHighlighter>

      <div className="flex items-center justify-between mb-2">
        <div className="text-sm">unpkg</div>
        <CopyButton isCopied={isUnpkgCopied} onCopy={handleUnpkgCopy} />
      </div>
      <SyntaxHighlighter
        language="html"
        style={oneLight}
        customStyle={{ marginBottom: 20, marginTop: 0 }}
      >
        {unpkg}
      </SyntaxHighlighter>
    </>
  );
}
