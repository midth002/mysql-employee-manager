const inquirer = require('inquirer');
const db = require('../config/connect');
const main = require('../index');

let rolesArray = [];
let fullNameArray = [];


function viewEmployees() {
    db.query('Select * From employee', function(err, results) {
        console.table(results);
        main.start()
    })
}

function getEmpName() {
    db.query('Select first_name from employee', function(err, results){
        for(i=0; i<results.length; i++) {
           fullNameArray.push(results[i].first_name);
        }
        return fullNameArray;
    })
}

function getRoleTitle() {
    db.query('Select title from emp_role', function(err, results) { 
        for (i=0; i<results.length; i++) {
            rolesArray.push(results[i].title);
        }
        return rolesArray;
    });
}


function addEmpInput() {
    db.query('Select title from emp_role', function(err, results) { 
        for (i=0; i<results.length; i++) {
            rolesArray.push(results[i].title);
        }

        fullNameArray.push('No Manager')
    });
    inquirer.prompt([ 
    
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: rolesArray
        },
        {
            type: 'list',
            name: 'manager',
            messsage: "What is their manager's ID?",
            choices: fullNameArray
          
        }

        ]).then((response) => {
            let roleIndex;
            let managerIndex;
            if (rolesArray.includes(response.role)) {
                roleIndex = rolesArray.indexOf(response.role) + 1; 
            }

            if (response.manager === 'No Manager') {
                managerIndex = null;
            } else {
                managerIndex = fullNameArray.indexOf(response.manager) + 1;
            }

            db.query(`INSERT INTO employee SET ?`, {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: roleIndex,
                manager_id: manager
            }, function(err, results) {
                if (err) {
                    console.log(err)
                } 
                console.log(`Added Employee: ${response.firstName} ${response.lastName} 
                Role: ${response.role} Manager: ${response.manager}`);
                main.start();
            });
        
    })
}

getEmpName();
getRoleTitle();
function updateEmployee() {
    
    inquirer.prompt([ 
        {
            type: 'list',
            name: 'employeeName',
            message: 'What is the department associated with this role',
            choices: fullNameArray
        },
        {
            type: 'list',
            name: 'updateEmpRole',
            message: 'What is the employees new role?',
            choices: rolesArray
        }
        ]
    ).then((response) => {
        let empRoleIndex;
        let empNameIndex;
        if (rolesArray.includes(response.updateEmpRole)) {
            empRoleIndex = rolesArray.indexOf(response.updateEmpRole) + 1; 
        }

        if (fullNameArray.includes(response.employeeName)) {
            empNameIndex = fullNameArray.indexOf(response.employeeName) + 1; 
        }


        db.query(`Update employee join emp_role on 
        employee.role_id = emp_role.id set employee.role_id = ? 
        Where employee.id = ?;`, [empRoleIndex, empNameIndex], 
        function (err, results) {
            if (err) {
                console.log(err)
            }
            console.log(`${response.employeeName} role updated!`);
            main.start()
        })
    });
}


module.exports = {
    viewEmployees,
    addEmpInput,
    updateEmployee
}