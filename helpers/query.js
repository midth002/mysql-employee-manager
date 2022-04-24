const db = require('./connect');

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





module.exports = {
    viewDepts,
    viewRoles,
    viewEmployees
}