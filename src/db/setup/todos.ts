import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/todos.json");

async function setupTodos() {
  const db = await open({ filename: DB_PATH, driver: sqlite3.Database });

  await db.exec("DROP TABLE IF EXISTS todos");
  await db.exec(`
    CREATE TABLE todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content VARCHAR(100) NOT NULL,
      completed TINYINT(1) NOT NULL DEFAULT 0,
      userId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  const todos = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
  const insert = await db.prepare(
    "INSERT INTO todos (id, content, completed, userId) VALUES (?, ?, ?, ?)"
  );

  try {
    await db.run("BEGIN TRANSACTION");
    for (const todo of todos) {
      await insert.run(todo.id, todo.content, todo.completed, todo.userId);
    }
    await db.run("COMMIT");
  } catch (err) {
    await db.run("ROLLBACK");
    throw err;
  } finally {
    await insert.finalize();
    await db.close();
  }

  console.log("TODOS DB 초기화 완료!");
}

setupTodos();
