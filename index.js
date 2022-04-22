const mysql = require('mysql2');
require('dotenv').config()
// Connect to database
const db = mysql.createConnection(
 {
host: 'localhost',
// MySQL username,
user: 'root',
password: process.env.MYSQL_PW,
database: process.env.MYSQL_DB_NAME
},
console.log(`Connected to the database.`)
);
db.query('SELECT id,first_name FROM students', function (err, results) {
// console.log(results);

});

