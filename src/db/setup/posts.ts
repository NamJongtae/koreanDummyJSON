import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/posts.json");

async function setupPosts() {
  const db = await open({ filename: DB_PATH, driver: sqlite3.Database });

  await db.exec("DROP TABLE IF EXISTS posts");
  await db.exec(`
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(100) NOT NULL,
      content VARCHAR(1000) NOT NULL,
      imgUrl VARCHAR(200) DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      userId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  const posts = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
  const insert = await db.prepare(
    "INSERT INTO posts (id, title, content, imgUrl, createdAt, userId) VALUES (?, ?, ?, ?, ?, ?)"
  );

  try {
    await db.run("BEGIN TRANSACTION");
    for (const post of posts) {
      await insert.run(
        post.id,
        post.title,
        post.content,
        post.imgUrl,
        post.createdAt,
        post.userId
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

  console.log("POSTS DB 초기화 완료!");
}

setupPosts();
