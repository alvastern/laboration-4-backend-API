// Använder en SQLite-databas för att lagra användaruppgifter
const sqlite = require('sqlite3').verbose();
const database = new sqlite.Database('./databas/databas.db');

// Skapar en tabell för användare om den inte finns
database.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Exporterar filen så att den kan användas i andra filer
module.exports = database;