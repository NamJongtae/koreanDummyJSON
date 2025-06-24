import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/posts.json");

const db = new Database(DB_PATH);

db.prepare("DROP TABLE IF EXISTS posts").run();

db.prepare(
  `CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    imgUrl VARCHAR(200) DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  )`
).run();

const posts = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

const insert = db.prepare(
  "INSERT INTO posts (id, title, content, imgUrl, createdAt, userId) VALUES (?, ?, ?, ?, ?, ?)"
);

db.transaction(() => {
  for (const post of posts) {
    insert.run(
      post.id,
      post.title,
      post.content,
      post.imgUrl,
      post.createdAt,
      post.userId
    );
  }
})();

console.log("POSTS DB 초기화 완료!");
