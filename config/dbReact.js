const mysql = require('mysql');
require('dotenv/config');

const reactDb = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_REACT_HOST,
  user: process.env.DB_REACT_USER,
  password: process.env.DB_REACT_PASS,
  database: process.env.DB_REACT_DATABASE,
});

module.exports = reactDb;
