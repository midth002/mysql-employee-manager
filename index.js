const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
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

const choices = ['View All Departments', 'View All Roles', 'View All Employees', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role', 'Delete Employee', 'Delete Role', 
'Delete Department']


function start() {
    inquirer
    .prompt([ 
        {
           type: 'input',
           name: 'menu',
           message: 'What would you like to do?',
           choices: choices
        }
    ])
}

