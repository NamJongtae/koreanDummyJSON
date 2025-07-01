import React, { Dispatch, SetStateAction } from "react";
import GenerateButton from "./generate-button";
import CopyButton from "./copy-button";
import ResetButton from "./reset-button";
import useCopy from "@/src/hooks/commons/useCopy";
import useResetLorem  from "@/src/hooks/lorem/useResetLorem";

interface IProps {
  result: string;
  mode: "paragraph" | "sentence" | "word";
  asHtml?: boolean;
  resetByMode: (newMode: "paragraph" | "sentence" | "word") => void;
  setResult: Dispatch<SetStateAction<string>>;
  onGenerate: () => void;
}

const LoremButtonGroup = ({
  result,
  mode,
  asHtml = false,
  resetByMode,
  setResult,
  onGenerate
}: IProps) => {
  const { isCopied, handleCopy } = useCopy({target: result, timer: 1200});
  const { handleReset } = useResetLorem({
    mode,
    resetByMode,
    setResult
  });

  return (
    <div className="flex justify-between items-center mb-1 gap-2">
      <GenerateButton onGenerate={onGenerate} />
      <div className="flex gap-2">
        <CopyButton copied={isCopied} onCopy={handleCopy} disabled={!result} />
        <ResetButton onReset={handleReset} />
      </div>
    </div>
  );
};

export default LoremButtonGroup;
