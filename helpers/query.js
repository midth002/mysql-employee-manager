const db = require('./connect');
const ct = require('console.table');
let rolesArray = [];





function getRolesId() {
    db.query('Select id, title from emp_role', function(err, results) {
        
        console.table(results)
    })
}

function getEmpName() {
    db.query('Select first_name, last_name from employee', function(err, results){
   
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

function getRoles(rolesArray) {
    db.query('Select title from emp_role', function(err, results) { 
        for (i=0; i<results.length; i++) {
            rolesArray.push(results[i].title);
        }
    });
}
     
   


module.exports = {
    viewDepts,
    viewRoles,
    viewEmployees,
    addDept,
    getRoles,
    getEmpName
}