const inquirer = require('inquirer');
const db = require('../helpers/connect');
const main = require('../index');

let deptArray = [];

function viewRoles() {
    db.query('Select * From emp_role', function(err, results) {
        console.table(results);
        main.start();
    })
}

function addRoleInput() {
    let deptIndex;
    db.query('Select dept_name from department', function(err, results) { 
        for (i=0; i<results.length; i++) {
            deptArray.push(results[i].dept_name);
        }
    });
    inquirer.prompt([ 
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role'
        }, 
        {
            type: 'input',
            name: 'salary',
            message: 'What is the base salary for this role'
        }, 
        {
            type: 'list',
            name: 'deptRole',
            message: 'What is the department associated with this role',
            choices: deptArray
        }

        ]
    ).then((response) => {

        if (deptArray.includes(response.deptRole)) {
            deptIndex = deptArray.indexOf(response.deptRole) + 1; 
        }

        db.query(`INSERT INTO emp_role SET ?`, {
            title: response.title,
            salary: response.salary,
            department_id: deptIndex,
            
        }, function(err, results) {
            if (err) {
                console.log(err)
            } 
        console.log(`Added Role:  
        Title: ${response.title} 
        Salary: ${response.salary}
        Department: ${response.deptRole}`);
        main.start();
    })
}) 
}


module.exports = {
    viewRoles,
    addRoleInput
}
