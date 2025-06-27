import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/db/app.db");
const JSON_PATH = path.join(process.cwd(), "src/db/json/books.json");

async function setupBooks() {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  await db.exec("DROP TABLE IF EXISTS books");

  await db.exec(`
    CREATE TABLE books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author VARCHAR(20) NOT NULL,
      genre VARCHAR(50) NOT NULL,
      title VARCHAR(100) NOT NULL,
      publicationDate DATE NOT NULL,
      totalPage INTEGER NOT NULL
    )
  `);

  const books = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

  const insert = await db.prepare(
    "INSERT INTO books (id, author, genre, title, publicationDate, totalPage) VALUES (?, ?, ?, ?, ?, ?)"
  );

  try {
    await db.run("BEGIN TRANSACTION");
    for (const book of books) {
      await insert.run(
        book.id,
        book.author,
        book.genre,
        book.title,
        book.publicationDate,
        book.totalPage
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

  console.log("BOOKS DB 초기화 완료!");
}

setupBooks();
