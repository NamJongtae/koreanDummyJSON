import {
  getRandom,
  generateWord,
  generateSentence,
  generateParagraph,
  generateKoreanLipsum,
  MAX_PARAGRAPH,
  MAX_SENTENCE,
  MAX_WORD
} from "@/src/lib/loremGenerator";

describe("loremGenerator function test", () => {
  it("getRandom: 배열에서 랜덤 값을 반환한다", () => {
    const arr = [1, 2, 3, 4, 5];
    const value = getRandom(arr);
    expect(arr.includes(value)).toBe(true);
  });

  it("generateWord: 기본값으로 3글자 단어를 생성한다", () => {
    const word = generateWord();
    expect(typeof word).toBe("string");
    expect(word.length).toBe(3);
  });

  it("generateWord: 지정한 길이만큼 단어를 생성한다", () => {
    const word = generateWord(5);
    expect(word.length).toBe(5);
  });

  it("generateSentence: 기본값으로 30글자 문장을 생성한다", () => {
    const sentence = generateSentence();
    expect(typeof sentence).toBe("string");
    expect(sentence.length).toBe(30);
  });

  it("generateSentence: 지정한 길이만큼 문장을 생성한다", () => {
    const sentence = generateSentence(50);
    expect(sentence.length).toBe(50);
  });

  it("generateParagraph: 지정한 길이만큼 문단을 생성한다", () => {
    const paragraph = generateParagraph(100, 30);
    expect(typeof paragraph).toBe("string");
    expect(paragraph.length).toBe(100);
  });

  it("generateParagraph: 문단 끝에 마침표가 붙는다", () => {
    const paragraph = generateParagraph(80, 20);
    expect(paragraph.endsWith(".")).toBe(true);
  });

  it("generateKoreanLipsum: word 모드 - 단어 n개 생성", () => {
    const result = generateKoreanLipsum("word", 5, 0, 0, 2);
    expect(result.split(" ").length).toBe(5);
    result.split(" ").forEach((word) => expect(word.length).toBe(2));
  });

  it("generateKoreanLipsum: sentence 모드 - 문장 n개 생성", () => {
    const result = generateKoreanLipsum("sentence", 3, 0, 10, 0);
    const sentences = result.match(/.{10}/g) || [];
    expect(sentences.length).toBe(3);
    sentences.forEach((sentence) => expect(sentence.length).toBe(10));
  });

  it("generateKoreanLipsum: paragraph 모드 - 문단 n개 생성", () => {
    const result = generateKoreanLipsum("paragraph", 2, 40, 15, 0);
    expect(result.split("\n\n").length).toBe(2);
    result
      .split("\n\n")
      .forEach((paragraph) => expect(paragraph.length).toBe(40));
  });

  it("상수값: MAX_PARAGRAPH, MAX_SENTENCE, MAX_WORD 값 확인", () => {
    expect(MAX_PARAGRAPH).toBe(20);
    expect(MAX_SENTENCE).toBe(50);
    expect(MAX_WORD).toBe(100);
  });
});
