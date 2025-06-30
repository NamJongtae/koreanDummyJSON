import React from "react";

interface IProps {
  onReset: () => void;
}

const ResetButton = ({ onReset }: IProps) => (
  <button
    className="flex items-center gap-1 px-3 md:px-6 py-1 rounded border text-sm md:text-base font-medium transition bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
    onClick={onReset}
    type="button"
  >
    <span>⟲</span>
    <span>리셋</span>
  </button>
);

export default ResetButton;
