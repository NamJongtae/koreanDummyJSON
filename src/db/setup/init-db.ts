import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");

async function initDb() {
  // 빈 DB 파일 생성 (open/close)
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });
  await db.close();
  console.log("app.db 파일 초기화 완료!");
}

initDb();
