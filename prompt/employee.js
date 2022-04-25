const inquirer = require('inquirer');
const db = require('../helpers/connect');
const main = require('../index');

let rolesArray = [];

function viewEmployees() {
    db.query('Select * From employee', function(err, results) {
        console.table(results);
        main.start()
    })
}

function addEmpInput() {
    db.query('Select title from emp_role', function(err, results) { 
        for (i=0; i<results.length; i++) {
            rolesArray.push(results[i].title);
        }
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
            type: 'input',
            name: 'managerId',
            messsage: "What is their manager's ID?",
            default: 'No Manager'
          
        }

        ]).then((response) => {
            let manageIndex;
            let manager = response.managerId;
            if (rolesArray.includes(response.role)) {
                manageIndex = rolesArray.indexOf(response.role) + 1; 
            }

            if (response.managerId === 'No Manager') {
                manager = null;
            }

            db.query(`INSERT INTO employee SET ?`, {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: manageIndex,
                manager_id: manager
            }, function(err, results) {
                if (err) {
                    console.log(err)
                } 
                console.log(`Added Employee: ${response.firstName} ${response.lastName} 
                Role: ${response.role} Manager: ${response.managerId}`);
                main.start();
            });
        
    })
}


function updateEmployee() {
    
    // db.query('Select title from emp_role', function(err, results) { 
    //     for (i=0; i<results.length; i++) {
    //         rolesArray.push(results[i].title);
    //     }
    // });

    getRoles(roles);

    getEmpName();

   
    inquirer.prompt([ 
        {
            type: 'list',
            name: 'selectEmp',
            message: 'What employee do you want to change?',
            choices: employeeList
        },
        {
            type: 'list',
            name: 'updateRole',
            message: 'What is the employees new role?',
            choices: rolesArray
        }
        ]
    ).then((response) => {

        db.query('Update employee set role_id = ? Where id = ?')

        console.log('Employees role changed to: ' + response.updateRole);
        start();
    })
}


module.exports = {
    viewEmployees,
    addEmpInput,
    updateEmployee
}