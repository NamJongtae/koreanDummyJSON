import { Pool, createPool } from "mysql2";

/* eslint-disable */
declare global {
  var db: Pool | undefined;
}

const registerService = (name: string, initFn: () => Pool): Pool => {
  if (process.env.NODE_ENV === "development") {
    if (!(globalThis as any)[name]) {
      (globalThis as any)[name] = initFn();
    }
    return (globalThis as any)[name];
  }
  return initFn();
};
/* eslint-disable */

let db: Pool;

try {
  db = registerService("db", () => {
    const pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log("Database pool created");
    return pool;
  });
} catch (error) {
  console.error("Failed to create database connection pool:", error);
  throw new Error("Failed to initialize database connection");
}

async function executeQuery(query: string, values: any[] = []) {
  if (!db) {
    throw new Error("DB has not been initialized");
  }

  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return reject(error);
      }
      resolve(results);
    });
  });
}

export default executeQuery;
