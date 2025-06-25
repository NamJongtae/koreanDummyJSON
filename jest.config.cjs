const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./" // Next.js 앱의 루트 디렉토리 설정
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["/api-routes"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1" // 절대 경로 매핑
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest" // TypeScript 파일 인식
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"]
};

module.exports = createJestConfig(customJestConfig);
