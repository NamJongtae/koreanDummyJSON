import { NextRequest, NextResponse } from "next/server";
import { generateKoreanLipsum } from "@/src/lib/loremGenerator";

function clip(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const rawMode = searchParams.get("mode");
  let mode: "paragraph" | "sentence" | "word";

  if (rawMode === "paragraph" || rawMode === "p") {
    mode = "paragraph";
  } else if (rawMode === "sentence" || rawMode === "s") {
    mode = "sentence";
  } else if (rawMode === "word" || rawMode === "w") {
    mode = "word";
  } else {
    mode = "paragraph";
  }

  // count 처리
  const countParam = searchParams.get("count");
  const defaultCount = mode === "paragraph" ? 2 : 5;
  let count = Number(countParam);
  if (!countParam || isNaN(count)) {
    count = defaultCount;
  }

  // length 처리
  const lengthParam = searchParams.get("length");
  const defaultLength =
    mode === "paragraph" ? 200 : mode === "sentence" ? 30 : 3;
  let length = Number(lengthParam);
  if (!lengthParam || isNaN(length)) {
    length = defaultLength;
  }

  // 모드별 최댓값 제한
  if (mode === "paragraph") {
    count = clip(count, 1, 20);
    length = clip(length, 30, 500);
  } else if (mode === "sentence") {
    count = clip(count, 1, 50);
    length = clip(length, 10, 200);
  } else {
    count = clip(count, 1, 100);
    length = clip(length, 1, 10);
  }

  let result = "";
  if (mode === "paragraph") {
    result = generateKoreanLipsum("paragraph", count, length, 30, 3);
  } else if (mode === "sentence") {
    result = generateKoreanLipsum("sentence", count, 200, length, 3);
  } else {
    result = generateKoreanLipsum("word", count, 200, 30, length);
  }

  return NextResponse.json({ result });
}
