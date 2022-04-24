// Connect to database
const mysql = require('mysql2');
require('dotenv').config()
const db = mysql.createConnection(
    {
   host: 'localhost',
   // MySQL username,
   user: 'root',
   password: process.env.MYSQL_PW,
   database: process.env.MYSQL_DB_NAME
   }
   );
  

   module.exports = db;