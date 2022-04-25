
const ct = require('console.table');
const inquirer = require('inquirer');
// const { viewRoles, getRoles, getEmpName } = require('./helpers/query.js')
const db = require('./config/connect.js');
const { addDeptInput, viewDepts } = require('./prompt/department');
const {  viewEmployees, addEmpInput, updateEmployee } = require('./prompt/employee')
const { viewRoles, addRoleInput } = require('./prompt/role')




const choices = ['View All Departments', 'View All Roles', 'View All Employees', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role', 'Exit']
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
            console.table("Goodbye!")
            db.end();
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


exports.start = start;
start();


