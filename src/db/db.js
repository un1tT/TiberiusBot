const sqlite3 = require('sqlite3').verbose();
let db;

const createDB = () => {
  let db = new sqlite3.Database('./src/db/users.db', (error) => {
    if (error) console.log('DB error occurred ', error);
    else console.log('Connected to the in-memory SQlite database.');
  });
};

const closeDB = () => {
  db.close((err) => {
    if (err) return console.error(err.message);
    console.log('Close the database connection.');
  });
}

module.exports = createDB;
