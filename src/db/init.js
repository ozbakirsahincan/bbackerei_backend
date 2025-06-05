import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

export async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  console.log(`✅ Veritabanı kontrol edildi: ${DB_NAME}`);
  await connection.end();
}
if (process.argv[1] === new URL(import.meta.url).pathname) {
  ensureDatabaseExists().catch(console.error);
}