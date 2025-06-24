import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/users.json");

const db = new Database(DB_PATH);

db.prepare("DROP TABLE IF EXISTS users").run();

db.prepare(
  `CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    phone CHAR(14) NOT NULL,
    address VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`
).run();

const users = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

const insert = db.prepare(
  "INSERT INTO users (id, username, email, phone, address, createdAt) VALUES (?, ?, ?, ?, ?, ?)"
);

db.transaction(() => {
  for (const user of users) {
    insert.run(
      user.id,
      user.username,
      user.email,
      user.phone,
      user.address,
      user.createdAt
    );
  }
})();

console.log("USERS DB 초기화 완료!");
