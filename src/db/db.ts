import { Pool, createPool } from "mysql2";

/* eslint-disable */
declare global {
  var db: Pool | undefined;
}

/**
 * registerService는 주어진 서비스 이름과 초기화 함수를 기반으로
 * 개발 환경에서 전역 변수를 사용하여 풀을 캐시합니다.
 */
const registerService = (name: string, initFn: () => Pool): Pool => {
  if (process.env.NODE_ENV === "development") {
    // 글로벌 객체에 데이터베이스 연결 풀을 캐싱
    if (!(globalThis as any)[name]) {
      (globalThis as any)[name] = initFn();
    }
    return (globalThis as any)[name];
  }
  // 프로덕션 환경에서는 매번 새로운 풀 생성
  return initFn();
};

/* eslint-disable */
let db: Pool;

try {
  // "db"라는 이름으로 등록된 풀을 글로벌 캐시 또는 새로 생성
  db = registerService("db", () => {
    const pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10, // 최대 연결 수 제한
      queueLimit: 0 // 대기열 제한 없음
    });
    console.log("Database pool created");
    return pool;
  });
} catch (error) {
  console.error("Failed to create database connection pool:", error);
  throw new Error("Failed to initialize database connection");
}

/**
 * executeQuery는 쿼리를 실행하고 결과를 반환하는 함수입니다.
 * 쿼리 실행 중 에러가 발생하면 에러 메시지를 출력합니다.
 *
 * @param query - 실행할 SQL 쿼리 문자열
 * @param values - 쿼리에 삽입할 값 배열
 * @returns Promise<any> - 쿼리 결과를 반환하는 Promise
 */
async function executeQuery(query: string, values: any[] = []) {
  if (!db) {
    throw new Error("DB has not been initialized");
  }

  // 쿼리 실행 및 에러 처리
  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return reject(error); // 에러 발생 시 Promise reject
      }
      resolve(results); // 성공 시 Promise resolve
    });
  });
}

export default executeQuery;
