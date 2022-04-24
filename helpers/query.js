const db = require('./connect');

let rolesArray = [];

function viewDepts() {
    db.query('Select * From department', function(err, results) {
        console.log(results);
    })
}

function viewRoles() {
    db.query('Select * From emp_role', function(err, results) {
        console.log(results);
    })
}

function viewEmployees() {
    db.query('Select * From employee', function(err, results) {
        console.log(results);
    })
}

function addDept(dept) {
    let sql = 'INSERT INTO department (dept_name) VALUES ?'
    let value = [dept];
    db.query(sql, [value], function(err, results) {
        return results;
    });
}

function getRoles() {
    db.query('Select title from emp_role', function(err, results) { 
     
      for (i=0; i<results.length; i++) {
          rolesArray.push(results[i].title);
      }
     console.log(typeof rolesArray);
     console.log(rolesArray)
    })
}





module.exports = {
    viewDepts,
    viewRoles,
    viewEmployees,
    addDept,
    getRoles
}