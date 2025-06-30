import React from "react";

interface IProps {
  onGenerate: () => void;
}

const GenerateButton = ({ onGenerate }: IProps) => (
  <button
    className="flex items-center gap-1 px-3 md:px-6 py-1 rounded border text-sm md:text-base font-medium transition bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 shadow-sm"
    onClick={onGenerate}
  >
    <span>✨</span>
    <span>생성</span>
  </button>
);

export default GenerateButton;
