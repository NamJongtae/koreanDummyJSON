import useCopy from "@/src/hooks/commons/useCopy";
import React from "react";

interface IProps {
  result: string;
  disabled: boolean;
}

const CopyButton = ({ result, disabled }: IProps) => {
  const { isCopied, handleCopy } = useCopy({ target: result, timer: 1200 });

  return (
    <button
      className={`flex items-center gap-1 px-3 md:px-6 py-1 rounded border text-sm md:text-base font-medium transition
      bg-white border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-500 shadow-sm`}
      onClick={handleCopy}
      disabled={disabled}
    >
      {isCopied ? (
        <>
          <span>✅</span>
          <span>복사됨</span>
        </>
      ) : (
        <>
          <span>📋</span>
          <span>복사</span>
        </>
      )}
    </button>
  );
};

export default CopyButton;
