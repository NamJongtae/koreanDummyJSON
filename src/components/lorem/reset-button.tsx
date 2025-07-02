import useResetLorem from "@/src/hooks/lorem/useResetLorem";
import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  mode: "paragraph" | "sentence" | "word";
  resetByMode: (newMode: "paragraph" | "sentence" | "word") => void;
  setResult: Dispatch<SetStateAction<string>>;
}

const ResetButton = ({ mode, resetByMode, setResult }: IProps) => {
  const { handleReset } = useResetLorem({
    mode,
    resetByMode,
    setResult
  });

  return (
    <button
      className="flex items-center gap-1 px-3 md:px-6 py-1 rounded border text-sm md:text-base font-medium transition bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
      onClick={handleReset}
      type="button"
    >
      <span>⟲</span>
      <span>리셋</span>
    </button>
  );
};

export default ResetButton;
