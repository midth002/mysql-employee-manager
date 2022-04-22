const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection(
 {
host: 'localhost',
// MySQL username,
user: 'root',
password: '@a88word',
database: ''
},
console.log(`Connected to the database.`)
);
db.query('SELECT id,first_name FROM students', function (err, results) {
// console.log(results);
res.json(results)
});

