require('dotenv').config()
const sql = require('mysql2');

    // Connect to database
    const db = sql.createConnection(
     {
    host: 'localhost',
    user: process.env.MYSQL_ROOT,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB_NAME,
  
    },
    console.log(`Connected to the employee_management database.`)
    );
    
    
    module.exports = db;