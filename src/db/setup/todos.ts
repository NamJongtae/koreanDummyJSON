import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/todos.json");

const db = new Database(DB_PATH);

db.prepare("DROP TABLE IF EXISTS todos").run();

db.prepare(
  `CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content VARCHAR(100) NOT NULL,
    completed TINYINT(1) NOT NULL DEFAULT 0,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  )`
).run();

const todos = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

const insert = db.prepare(
  "INSERT INTO todos (id, content, completed, userId) VALUES (?, ?, ?, ?)"
);

db.transaction(() => {
  for (const todo of todos) {
    insert.run(todo.id, todo.content, todo.completed, todo.userId);
  }
})();

console.log("TODOS DB 초기화 완료!");
