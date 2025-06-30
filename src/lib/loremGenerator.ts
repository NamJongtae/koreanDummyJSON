import lorem from "@/src/constants/lorem.json";

/**
 * 배열에서 랜덤하게 하나의 값을 반환합니다.
 */
export function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 지정한 글자 수만큼 한글 단어를 생성합니다.
 */
export function generateWord(wordLen: number = 3): string {
  const parts: string[] = [];
  let totalLen = 0;
  while (totalLen < wordLen) {
    const type = Math.random();
    let part = "";
    if (type < 1 / 3) part = getRandom(lorem.nouns);
    else if (type < 2 / 3) part = getRandom(lorem.verbs);
    else part = getRandom(lorem.adjectives);
    const remain = wordLen - totalLen;
    if (part.length > remain) {
      parts.push(part.slice(0, remain));
      break;
    }
    parts.push(part);
    totalLen += part.length;
  }
  return parts.join("");
}

/**
 * 지정한 길이만큼 한글 문장을 생성합니다.
 */
export function generateSentence(sentenceLen: number = 30): string {
  const ending = getRandom(lorem.verbs.concat(lorem.adjectives)) + ".";
  const endingLen = ending.length;
  const remainLen = sentenceLen - endingLen;
  let body = "";
  while (body.length < remainLen) {
    const pattern = Math.random();
    let part = "";
    if (pattern < 0.5) {
      const noun = getRandom(lorem.nouns);
      const particle = getRandom(lorem.particles);
      part = `${noun}${particle} `;
    } else {
      const noun1 = getRandom(lorem.nouns);
      const particle1 = getRandom(lorem.particles);
      const noun2 = getRandom(lorem.nouns);
      const particle2 = getRandom(lorem.particles);
      part = `${noun1}${particle1} ${noun2}${particle2} `;
    }
    const remain = remainLen - body.length;
    if (part.length > remain) {
      body += part.slice(0, remain);
      break;
    }
    body += part;
  }
  return body + ending;
}

/**
 * 지정한 길이만큼 한글 문단을 생성합니다.
 */
export function generateParagraph(
  paragraphLen: number,
  sentenceLen: number
): string {
  let paragraph = "";
  while (paragraph.length < paragraphLen) {
    const sentence = generateSentence(sentenceLen);
    if (paragraph.length + sentence.length > paragraphLen) {
      // 마지막 문장도 앞에 문장이 있으면 반드시 공백을 붙여서 자르기
      if (paragraph) {
        const remain = paragraphLen - paragraph.length;
        paragraph += " " + sentence.slice(0, remain - 1); // -1은 공백 포함
      } else {
        paragraph += sentence.slice(0, paragraphLen);
      }
      break;
    }
    paragraph += (paragraph ? " " : "") + sentence;
  }
  // 문단 마지막이 마침표로 끝나지 않으면 추가
  if (!paragraph.trim().endsWith(".")) {
    paragraph = paragraph.trim() + ".";
  }
  return paragraph;
}

/**
 * mode에 따라 단어/문장/문단을 랜덤하게 생성합니다.
 * - word: generateWord로 단어 n개 생성
 * - sentence: generateSentence로 문장 n개 생성
 * - paragraph: generateParagraph로 문단 n개 생성
 */
export function generateKoreanLipsum(
  mode: "paragraph" | "sentence" | "word",
  count: number,
  paragraphLen: number,
  sentenceLen: number,
  wordLen: number
) {
  if (mode === "word") {
    return Array.from({ length: count }, () => generateWord(wordLen)).join(" ");
  }
  if (mode === "sentence") {
    return Array.from({ length: count }, () =>
      generateSentence(sentenceLen)
    ).join(" ");
  }
  // paragraph
  return Array.from({ length: count }, () =>
    generateParagraph(paragraphLen, sentenceLen)
  ).join("\n\n");
}

/**
 * 각 모드별 최대 개수 상수
 */
export const MAX_PARAGRAPH = 20;
export const MAX_SENTENCE = 50;
export const MAX_WORD = 100;
