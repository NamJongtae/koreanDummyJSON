import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/books.json");

const db = new Database(DB_PATH);

db.prepare("DROP TABLE IF EXISTS books").run();

db.prepare(
  `CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author VARCHAR(20) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    publicationDate DATE NOT NULL,
    totalPage INTEGER NOT NULL
  )`
).run();

const books = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

const insert = db.prepare(
  "INSERT INTO books (id, author, genre, title, publicationDate, totalPage) VALUES (?, ?, ?, ?, ?, ?)"
);

db.transaction(() => {
  for (const book of books) {
    insert.run(
      book.id,
      book.author,
      book.genre,
      book.title,
      book.publicationDate,
      book.totalPage
    );
  }
})();

console.log("BOOKS DB 초기화 완료!");
