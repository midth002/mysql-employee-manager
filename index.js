
const cTable = require('console.table');
const inquirer = require('inquirer');
const { viewDepts, viewRoles, viewEmployees, addDept, getRoles } = require('./helpers/query.js')




const choices = ['View All Departments', 'View All Roles', 'View All Employees', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role']
const menuQuestion = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: choices,
     }
]
function init() {
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


function addDeptInput() {
    inquirer.prompt([ 
        {
            type: 'input',
            name: 'dept',
            message: 'What is the name of the department'
        }
        ]
    ).then((response) => {
        console.log('Added department: ' + response.dept);
        init();
    })
}

function addEmpInput() {
    const rolesArray = ['Software Engineer', 'Accountant', 'Marketing Manager', 'Project Manager', 'Human Resource Manager']
    inquirer.prompt([ 
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's first name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: rolesArray
        },

        ]).then((response) => {
        console.log(`Added Employee: ${response.firstName} ${response.lastName} 
        Role: ${response.role}`);
        init();
    })
}

function addRoleInput() {
    const deptArray = ['Software', 'Accounting', 'Sales', 'Management', 'Customer Relations']
    inquirer.prompt([ 
        {
            type: 'input',
            name: 'role',
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
        console.log(`Added Role:  
        Title: ${response.role} 
        Salary: ${response.salary}
        Department: ${response.deptRole}`);
        init();
    })
}


init();

