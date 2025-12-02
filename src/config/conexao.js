import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
  return open({
    filename: './src/database/database.db',  // caminho do seu arquivo SQLite
    driver: sqlite3.Database
  });
}

export const db = await openDb()