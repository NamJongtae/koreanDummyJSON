import path from "path";
import Database from "better-sqlite3";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");

// 빈 DB 파일 생성
new Database(DB_PATH).close();

console.log("app.db 파일 초기화 완료!");
