const mysql = require('mysql');
require('dotenv/config');

const globalDb = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_GLOBAL_HOST,
  user: process.env.DB_GLOBAL_USER,
  password: process.env.DB_GLOBAL_PASS,
  database: process.env.DB_GLOBAL_DATABASE,
});

module.exports = globalDb;
