import { useState } from "react";
import { generateKoreanLipsum } from "@/src/lib/loremGenerator";

export function useGenerateLorem(options: {
  mode: "paragraph" | "sentence" | "word";
  count: number | string;
  lengthValue: number | string;
}) {
  const [result, setResult] = useState<string>("");

  function handleGenerate() {
    const mode = options.mode;
    const count = Number(options.count);
    const lengthValue = Number(options.lengthValue);
    let lipsum = "";
    if (mode === "paragraph") {
      lipsum = generateKoreanLipsum("paragraph", count, lengthValue, 30, 3);
    } else if (mode === "sentence") {
      lipsum = generateKoreanLipsum("sentence", count, 200, lengthValue, 3);
    } else {
      lipsum = generateKoreanLipsum("word", count, 200, 30, lengthValue);
    }
    setResult(lipsum);
  }

  return { result, setResult, handleGenerate };
}
