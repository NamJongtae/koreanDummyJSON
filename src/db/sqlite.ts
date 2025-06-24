import Database from "better-sqlite3";
import path from "path";

export function getDb() {
  const DB_PATH = path.join(process.cwd(), "src/db/app.db");
  return new Database(DB_PATH);
}
