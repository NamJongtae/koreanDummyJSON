import sqlite3 from "sqlite3";
import { open, Database as SqliteDatabase } from "sqlite";
import path from "path";

export async function getDb(): Promise<SqliteDatabase> {
  const DB_PATH = path.join(process.cwd(), "src/db/app.db");
  return await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });
}
