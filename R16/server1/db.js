// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Open a connection to the SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create the `users` table with the `sector` field if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL,
        hireDate TEXT NOT NULL,
        sector TEXT NOT NULL
    )`);

    // Create the `tokens` table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT NOT NULL UNIQUE,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id)
    )`);
});

module.exports = db;