import React from "react";

interface IProps {
  mode: "paragraph" | "sentence" | "word";
  setMode: (mode: "paragraph" | "sentence" | "word") => void;
  count: number | string;
  setCount: (val: number | string) => void;
  countLabel: string;
  countMin: number;
  countMax: number;
  lengthLabel: string;
  lengthMin: number;
  lengthMax: number;
  lengthValue: number | string;
  setLengthValue: (val: number | string) => void;
  modeBadge: string;
  clip: (val: number, min: number, max: number) => number;
  resetByMode: (mode: "paragraph" | "sentence" | "word") => void;
  handleCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCountBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleLengthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLengthBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const LoremOptions = ({
  mode,
  count,
  countLabel,
  countMin,
  countMax,
  lengthLabel,
  lengthMin,
  lengthMax,
  lengthValue,
  modeBadge,
  resetByMode,
  handleCountChange,
  handleCountBlur,
  handleLengthChange,
  handleLengthBlur
}: IProps) => {
  return (
    <section className="mb-4 sm:mb-6 p-2 sm:p-4 rounded-lg bg-gray-50 border flex flex-col gap-1 sm:gap-2">
      <div className="flex flex-col xs:flex-row items-center justify-between mb-2 gap-4">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${mode === "paragraph" ? "bg-blue-500 text-white" : "bg-white border"}`}
            onClick={() => resetByMode("paragraph")}
          >
            문단
          </button>
          <button
            className={`px-3 py-1 rounded ${mode === "sentence" ? "bg-blue-500 text-white" : "bg-white border"}`}
            onClick={() => resetByMode("sentence")}
          >
            문장
          </button>
          <button
            className={`px-3 py-1 rounded ${mode === "word" ? "bg-blue-500 text-white" : "bg-white border"}`}
            onClick={() => resetByMode("word")}
          >
            단어
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="ml-4 inline-block bg-blue-100 text-blue-600 text-xs font-semibold rounded-full px-3 py-1">
            {modeBadge}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <label className="text-xs sm:text-sm font-medium w-16 sm:w-20">
          {countLabel}
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="w-20 sm:w-24 px-2 py-1 border rounded text-right"
          min={countMin}
          max={countMax}
          value={count}
          onChange={handleCountChange}
          onBlur={handleCountBlur}
        />
        <span className="text-xs text-gray-400">개</span>
        <span className="ml-auto text-xs text-gray-400">{`(${countMin}~${countMax})`}</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <label className="text-xs sm:text-sm font-medium w-16 sm:w-20">
          {lengthLabel}
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="w-20 sm:w-24 px-2 py-1 border rounded text-right"
          min={lengthMin}
          max={lengthMax}
          value={lengthValue}
          onChange={handleLengthChange}
          onBlur={handleLengthBlur}
        />
        <span className="text-xs text-gray-400">글자</span>
        <span className="ml-auto text-xs text-gray-400">{`(${lengthMin}~${lengthMax})`}</span>
      </div>
    </section>
  );
};

export default LoremOptions;
