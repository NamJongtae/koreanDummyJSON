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
  const ending = getRandom(lorem.verbs.concat(lorem.adjectives));
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

  return (body + ending).slice(0, sentenceLen);
}

/**
 * 지정한 길이만큼 한글 문단을 생성합니다.
 */
export function generateParagraph(
  paragraphLen: number,
  sentenceLen: number
): string {
  let paragraph = "";

  while (paragraph.length < paragraphLen - 1) {
    const sentence = generateSentence(sentenceLen);
    const needsSpace = paragraph.length > 0 ? 1 : 0;
    const remain = paragraphLen - 1 - paragraph.length;

    if (remain <= needsSpace) break;
    
    if (remain <= sentence.length + needsSpace) {
      // 마지막 문장: 남은 공간만큼 자르되, 공백으로 끝나면 조정
      if (needsSpace) {
        paragraph += " ";
      }
      const remainAfterSpace = paragraphLen - 1 - paragraph.length;
      let slicedSentence = sentence.slice(0, remainAfterSpace);
      
      // 공백으로 끝나면 공백 제거하고 한 글자 더 추가
      if (slicedSentence.endsWith(' ') && remainAfterSpace < sentence.length) {
        slicedSentence = sentence.slice(0, remainAfterSpace + 1).trimEnd();
      }
      
      paragraph += slicedSentence;
      break;
    } else {
      // 공백 포함해서 전체 문장 추가
      paragraph += (needsSpace ? " " : "") + sentence;
    }
  }

  // 마지막에 마침표 붙이기
  paragraph += ".";

  // 혹시라도 길이가 넘으면 자르기
  return paragraph.slice(0, paragraphLen);
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
