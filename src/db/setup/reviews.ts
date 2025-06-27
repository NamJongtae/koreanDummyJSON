import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/reviews.json");

async function setupReviews() {
  const db = await open({ filename: DB_PATH, driver: sqlite3.Database });

  await db.exec("DROP TABLE IF EXISTS reviews");
  await db.exec(`
    CREATE TABLE reviews (
      id INTEGER NOT NULL PRIMARY KEY,
      rating INTEGER NOT NULL,
      content VARCHAR(200) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      userId INTEGER NOT NULL,
      bookId INTEGER NOT NULL,
      UNIQUE(id),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE
    )
  `);

  const reviews = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
  const insert = await db.prepare(
    "INSERT INTO reviews (id, rating, content, createdAt, userId, bookId) VALUES (?, ?, ?, ?, ?, ?)"
  );

  try {
    await db.run("BEGIN TRANSACTION");
    for (const review of reviews) {
      await insert.run(
        review.id,
        review.rating,
        review.content,
        review.createdAt,
        review.userId,
        review.bookId
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

  console.log("REVIEWS DB 초기화 완료!");
}

setupReviews();
