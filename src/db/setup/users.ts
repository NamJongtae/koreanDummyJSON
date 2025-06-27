import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/users.json");

async function setupUsers() {
  const db = await open({ filename: DB_PATH, driver: sqlite3.Database });

  await db.exec("DROP TABLE IF EXISTS users");
  await db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(20) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL,
      phone CHAR(14) NOT NULL,
      address VARCHAR(100) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const users = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
  const insert = await db.prepare(
    "INSERT INTO users (id, username, email, phone, address, createdAt) VALUES (?, ?, ?, ?, ?, ?)"
  );

  try {
    await db.run("BEGIN TRANSACTION");
    for (const user of users) {
      await insert.run(
        user.id,
        user.username,
        user.email,
        user.phone,
        user.address,
        user.createdAt
      );
    }
    await db.run("COMMIT");
  } catch (err) {
    await db.run("ROLLBACK");
    throw err;
  } finally {
    await insert.finalize();
    await db.close();
  }

  console.log("USERS DB 초기화 완료!");
}

setupUsers();
