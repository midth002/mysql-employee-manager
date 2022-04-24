
const cTable = require('console.table');
const inquirer = require('inquirer');
const { viewDepts, viewRoles, viewEmployees } = require('./helpers/query.js')


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
     inquirer
    .prompt(menuQuestion).then((response) => {
        console.log(response); 
    //     switch (response.userview) {
    //         case choices[0]: viewDepts()
    //         break;

    //         default: 
    //         break;
    //     }
    })
     .catch((error) => {
        if (error.isTtyError) {
          console.log(error)
        } else {
         console.log('Something else is wrong')
        }
      });
}

init();

