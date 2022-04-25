const inquirer = require('inquirer');
const db = require('../helpers/connect');
const main = require('../index')
const ct = require('console.table');



function addDeptInput() {
    
    inquirer.prompt([ 
        {
            type: 'input',
            name: 'dept',
            message: 'What is the name of the department'
        }
        ]
    ).then((response) => {

        db.query(`INSERT INTO department SET ?`, {
            dept_name: response.dept
        }, function(err, results) {
            if (err) {
                console.log(err)
            } 
            console.log(response.dept + ' added to the department list.');
            main.start();
        });
    })
}


module.exports = {
    addDeptInput
}