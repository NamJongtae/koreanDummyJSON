import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/comments.json");

async function setupComments() {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  await db.exec("DROP TABLE IF EXISTS comments");

  await db.exec(`
    CREATE TABLE comments (
      id INTEGER NOT NULL PRIMARY KEY,
      content VARCHAR(200) NOT NULL,
      createdAt TIMESTAMP NOT NULL,
      userId INTEGER NOT NULL,
      postId INTEGER NOT NULL,
      UNIQUE(id),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
    )
  `);

  const comments = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

  const insert = await db.prepare(
    "INSERT INTO comments (id, content, createdAt, userId, postId) VALUES (?, ?, ?, ?, ?)"
  );

  try {
    await db.run("BEGIN TRANSACTION");
    for (const comment of comments) {
      await insert.run(
        comment.id,
        comment.content,
        comment.createdAt,
        comment.userId,
        comment.postId
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

  console.log("COMMENTS DB 초기화 완료!");
}

setupComments();
