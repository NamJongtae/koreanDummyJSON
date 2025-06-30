import React from "react";

interface IProps {
  copied: boolean;
  onCopy: () => void;
  disabled: boolean;
}

const CopyButton = ({ copied, onCopy, disabled }: IProps) => (
  <button
    className={`flex items-center gap-1 px-3 md:px-6 py-1 rounded border text-sm md:text-base font-medium transition
      bg-white border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-500 shadow-sm`}
    onClick={onCopy}
    disabled={disabled}
  >
    {copied ? (
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

export default CopyButton;
