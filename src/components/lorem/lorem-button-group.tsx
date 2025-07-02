import React, { Dispatch, SetStateAction } from "react";
import GenerateButton from "./generate-button";
import CopyButton from "./copy-button";
import ResetButton from "./reset-button";

interface IProps {
  result: string;
  mode: "paragraph" | "sentence" | "word";
  resetByMode: (newMode: "paragraph" | "sentence" | "word") => void;
  setResult: Dispatch<SetStateAction<string>>;
  onGenerate: () => void;
}

const LoremButtonGroup = ({
  result,
  mode,
  resetByMode,
  setResult,
  onGenerate
}: IProps) => {
  return (
    <div className="flex justify-between items-center mb-1 gap-2">
      <GenerateButton onGenerate={onGenerate} />
      <div className="flex gap-2">
        <CopyButton result={result} disabled={!result} />
        <ResetButton
          mode={mode}
          resetByMode={resetByMode}
          setResult={setResult}
        />
      </div>
    </div>
  );
};

export default LoremButtonGroup;
