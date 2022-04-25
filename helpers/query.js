const db = require('./connect');
const ct = require('console.table');
let rolesArray = [];

function viewDepts() {
    db.query('Select * From department', function(err, results) {
        console.table(results);
    })
}

function viewRoles() {
    db.query('Select * From emp_role', function(err, results) {
        console.table(results);
    })
}

function viewEmployees() {
    db.query('Select * From employee', function(err, results) {
        console.table(results);
    })
}

function getRolesId() {
    db.query('Select id, title from emp_role', function(err, results) {
        console.table(results)
    })
}

function addDept(dept) {
    let sql = 'INSERT INTO department (dept_name) VALUES ?'
    let value = [dept];
    db.query(sql, [value], function(err, results) {
        console.log(results);
    });
}

function getRoles() {
    db.query('Select title from emp_role', function(err, results) { 
     
      for (i=0; i<results.length; i++) {
          rolesArray.push(results[i].title);
      }
     console.log(typeof rolesArray);
     
    })
}


module.exports = {
    viewDepts,
    viewRoles,
    viewEmployees,
    addDept,
    getRoles
}