
const ct = require('console.table');
const inquirer = require('inquirer');
const { viewDepts, viewRoles, viewEmployees, addDept, getRoles, getEmpName } = require('./helpers/query.js')
const db = require('./helpers/connect.js');
const { addDeptInput } = require('./department/department.js')

let rolesArray = [];
let deptArray = [];

const choices = ['View All Departments', 'View All Roles', 'View All Employees', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role']
const menuQuestion = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: choices,
     }
]


function start() {
     inquirer.prompt(menuQuestion).then((response) => {
        console.log(response)
        switch (response.menu) {
            case choices[0]: viewDepts()
            break;
            case choices[1]: viewRoles()
            break;
            case choices[2]: viewEmployees()
            break;
            case choices[5]: addDeptInput()
            break;
            case choices[3]: addEmpInput()
            break;
            case choices[4]: addRoleInput()
            break;
            case choices[6]: updateEmployee()
            break;
            default: 
            break;
        }
       
    })
     .catch((error) => {
        if (error.isTtyError) {
          console.log(error)
        } else {
         console.log('Something else is wrong')
        }
      });
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
                init();
            });
        
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
        start();
    })
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

exports.start = start;
start();


