import sqlite3 from "sqlite3";
import { open, Database as SqliteDatabase } from "sqlite";
import path from "path";

let db: SqliteDatabase | null = null;

export async function getDb(): Promise<SqliteDatabase> {
  if (!db) {
    const DB_PATH = path.join(process.cwd(), "src/db/app.db");
    db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database
    });
  }
  return db;
}
