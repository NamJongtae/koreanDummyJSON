import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/comments.json");

const db = new Database(DB_PATH);

db.prepare("DROP TABLE IF EXISTS comments").run();

db.prepare(
  `CREATE TABLE comments (
    id INTEGER NOT NULL PRIMARY KEY,
    content VARCHAR(200) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    userId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    UNIQUE(id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
  )`
).run();

const comments = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

const insert = db.prepare(
  "INSERT INTO comments (id, content, createdAt, userId, postId) VALUES (?, ?, ?, ?, ?)"
);

db.transaction(() => {
  for (const comment of comments) {
    insert.run(
      comment.id,
      comment.content,
      comment.createdAt,
      comment.userId,
      comment.postId
    );
  }
})();

console.log("COMMENTS DB 초기화 완료!");
