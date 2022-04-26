const db = require('./connect');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const { addDeptInput, viewDepts } = require('./prompt/department');
// const { viewEmployees, addEmpInput, updateEmployee } = require('./prompt/employee');
// const { viewRoles, addRoleInput } = require('./prompt/role');


const choices = ['View All Departments', 'View All Roles', 'View All Employees', 
'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role', 'View employees by department', 'Exit']

const menuQuestion = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: choices
     }
]

function title() {
  const topLine = "#================================================#\n";
  const bottomLine = "\#================================================#\n";
  const spaceBetween = "#                                                #\n";
  const bodyText = "#  WELCOME TO THE EMPLOYEE MANAGER APPLICATION   #\n";
  const title = topLine + spaceBetween + spaceBetween + bodyText + spaceBetween + spaceBetween + bottomLine;
  console.log('\n\n' + title + '\n')
}

function start() {
    title();
    loadMenu();
};

function loadMenu() {
  inquirer.prompt(menuQuestion).then((response) => {
        switch (response.menu) {
            case choices[0]: allDepts()
            break;
            case choices[1]: allRoles()
            break;
            case choices[2]: allEmps()
            break;
            case choices[5]: addDepts()
            break;
            case choices[3]: addEmps()
            break;
            case choices[4]: addRoles()
            break;
            case choices[6]: updateEmps()
            break;
            case choices[7]: viewEmployeesByDepartment()
            break;
            case choices[8]: db.end()
            console.log("Goodbye!")
            break;
            default: console.log("An error has occured. Cannot recognized option.")
            break;
        }

    })
     .catch((error) => {
        if (error) {
          console.log(error)
        }
      });
}

start();



async function viewDepts() {
  db.query('Select * From department', function(err, results) {
       console.table(results);
       loadMenu();
   })
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

       db.query(`INSERT INTO department SET ?`, {
           dept_name: response.dept
       }, function(err, results) {
           if (err) {
               console.log(err)
           } 
           console.log(response.dept + ' added to the department list.');
           loadMenu()
       });
   })
}

let rolesArray = [];
 let fullNameArray = [];

function viewEmployees() {
  db.query('Select first_name, last_name, title, salary, manager_id From employee Join emp_role On employee.role_id = emp_role.id', function(err, results) {
      console.table(results);
      loadMenu();
  })
}

function viewEmployeesByDepartment() {

  let deptArray = ['All'];
  
    db.query('Select dept_name from department', function(err, results) { 
      for (i=0; i<results.length; i++) {
          deptArray.push(results[i].dept_name);
      }

      inquirer.prompt([   
    {
        type: 'list',
        name: 'departmentList',
        message: "What department would you like to see employees?",
        choices: deptArray
    }]).then((response) => {
      if (response.departmentList == 'All') {
        db.query(`Select department.dept_name As Department, employee.first_name, employee.last_name, emp_role.salary
      from department join emp_role on department.id = emp_role.department_id join employee on emp_role.id = employee.role_id`, function(err, results) {
        console.table(results);
        loadMenu();
      })} else {
      db.query(`Select  department.dept_name As Department, employee.first_name, employee.last_name, emp_role.salary
      from department join emp_role on department.id = emp_role.department_id join employee on emp_role.id = employee.role_id
      Where dept_name = ?`, response.departmentList, function(err, results) {
          console.table(results);
          loadMenu();
      })
    }
    })

  });
}


async function getRoleTitle() {
    db.query('Select title from emp_role', function(err, results) { 
        for (i=0; i<results.length; i++) {
            rolesArray.push(results[i].title);
        }
        return rolesArray;
    });
}


async function addEmpInput() {
  let emps = [];
  db.query('Select title from emp_role', function(err, results) { 
      for (i=0; i<results.length; i++) {
          rolesArray.push(results[i].title);
      }

      
  db.query('Select first_name, last_name from employee', function(err, results){

    for (i=0; i<results.length; i++) {
     emps.push(results[i].first_name + ' ' + results[i].last_name);
  } 

      emps.push('No Manager')
 
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
          choices: emps
        
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
              manager_id: managerIndex
          }, function(err, results) {
              if (err) {
                  console.log(err)
              } 
              console.log(`Added Employee: ${response.firstName} ${response.lastName} 
              Role: ${response.role} Manager: ${response.manager}`);
              loadMenu();
          }); 
      
  })
});
});
}

 
function updateEmployee() {
  let emps = [];
  db.query('Select first_name, last_name from employee', function(err, results){

    for (i=0; i<results.length; i++) {
     emps.push(results[i].first_name + ' ' + results[i].last_name);
  } 

  db.query('Select title from emp_role', function(err, results) { 
    for (i=0; i<results.length; i++) {
        rolesArray.push(results[i].title);
    }

  inquirer.prompt([ 
      {
          type: 'list',
          name: 'employeeName',
          message: 'What is the employee you want to update',
          choices: emps
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
          loadMenu()
      })
  });

});
}); 
}


let deptArray = [];

function viewRoles() {
    db.query('Select * From emp_role', function(err, results) {
        console.table(results);
        loadMenu()
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
        loadMenu();
    })
}) 
}


const allDepts = async ()=>{
 await viewDepts();
 
}

const allRoles = async ()=>{
  await viewRoles();
  //  loadMenu();
 }

 const allEmps = async ()=>{
  await viewEmployees();
  //  loadMenu();
 }

 const addDepts = async ()=>{
  await addDeptInput();
  //  loadMenu();
 }

 const addRoles = async ()=>{
  await addRoleInput();
  //  loadMenu();
 }

 const addEmps = async ()=>{
  await addEmpInput();
  // loadMenu();
 }

 const updateEmps = async ()=>{
  await updateEmployee();
  //  loadMenu();
 }

 


// exports.loadMenu = loadMenu;



