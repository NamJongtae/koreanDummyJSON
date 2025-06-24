import Database from "better-sqlite3";
import path from "path";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const DB_PATH = path.join(process.cwd(), "src/db/app.db");
    db = new Database(DB_PATH);
  }
  return db;
}
