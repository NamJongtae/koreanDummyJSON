import { useState } from "react";
import {
  MAX_PARAGRAPH,
  MAX_SENTENCE,
  MAX_WORD
} from "@/src/lib/loremGenerator";

export function useLoremOptions() {
  const [mode, setMode] = useState<"paragraph" | "sentence" | "word">(
    "paragraph"
  );
  const [count, setCount] = useState<number | string>(2);
  const [lengthValue, setLengthValue] = useState<number | string>(200);

  const countMaxMap = {
    paragraph: MAX_PARAGRAPH,
    sentence: MAX_SENTENCE,
    word: MAX_WORD
  };
  const countMax = countMaxMap[mode];
  const countMin = 1;

  const lengthMinMap = {
    paragraph: 30,
    sentence: 10,
    word: 1
  };
  const lengthMin = lengthMinMap[mode];

  const lengthMaxMap = {
    paragraph: 500,
    sentence: 200,
    word: 10
  };
  const lengthMax = lengthMaxMap[mode];

  const countLabelMap = {
    paragraph: "문단 개수",
    sentence: "문장 개수",
    word: "단어 개수"
  };
  const countLabel = countLabelMap[mode];

  const lengthLabelMap = {
    paragraph: "문단 글자수",
    sentence: "문장 글자수",
    word: "단어 글자수"
  };
  const lengthLabel = lengthLabelMap[mode];

  const clip = (val: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, val));
  };

  const modeBadgeMap = {
    paragraph: () =>
      `문단 ${clip(Number(count), countMin, countMax)}개, ${clip(Number(lengthValue), lengthMin, lengthMax)}글자`,
    sentence: () =>
      `문장 ${clip(Number(count), countMin, countMax)}개, ${clip(Number(lengthValue), lengthMin, lengthMax)}글자`,
    word: () =>
      `단어 ${clip(Number(count), countMin, countMax)}개, ${clip(Number(lengthValue), lengthMin, lengthMax)}글자`
  };
  const modeBadge = modeBadgeMap[mode]();

  const resetByMode = (newMode: "paragraph" | "sentence" | "word") => {
    setMode(newMode);
    setCount(newMode === "paragraph" ? 2 : 5);
    setLengthValue(
      newMode === "paragraph" ? 200 : newMode === "sentence" ? 30 : 3
    );
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    const num = Number(val);
    if (num > countMax) {
      setCount(countMax);
    } else {
      setCount(val);
    }
  };

  const handleCountBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setCount(clip(Number(val), countMin, countMax));
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    const num = Number(val);
    if (num > lengthMax) {
      setLengthValue(lengthMax);
    } else {
      setLengthValue(val);
    }
  };

  const handleLengthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setLengthValue(clip(Number(val), lengthMin, lengthMax));
  };

  return {
    mode,
    setMode,
    count,
    setCount,
    countLabel,
    countMax,
    countMin,
    lengthLabel,
    lengthMin,
    lengthMax,
    lengthValue,
    setLengthValue,
    clip,
    modeBadge,
    resetByMode,
    handleCountChange,
    handleCountBlur,
    handleLengthChange,
    handleLengthBlur
  };
}
