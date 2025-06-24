import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/reviews.json");

const db = new Database(DB_PATH);

db.prepare("DROP TABLE IF EXISTS reviews").run();

db.prepare(
  `CREATE TABLE reviews (
    id INTEGER NOT NULL PRIMARY KEY,
    rating INTEGER NOT NULL,
    content VARCHAR(200) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userId INTEGER NOT NULL,
    bookId INTEGER NOT NULL,
    UNIQUE(id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE
  )`
).run();

const reviews = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

const insert = db.prepare(
  "INSERT INTO reviews (id, rating, content, createdAt, userId, bookId) VALUES (?, ?, ?, ?, ?, ?)"
);

db.transaction(() => {
  for (const review of reviews) {
    insert.run(
      review.id,
      review.rating,
      review.content,
      review.createdAt,
      review.userId,
      review.bookId
    );
  }
})();

console.log("REVIEWS DB 초기화 완료!");
