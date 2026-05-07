const sqlite = require('sqlite3').verbose();
const database = new sqlite.Database('./databas/databas.db');

database.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = database;