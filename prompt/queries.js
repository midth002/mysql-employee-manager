// const db = require('../connect');

// async function getEmpName() {
//     let emps = [];
//     db.query('Select id, first_name, last_name from employee', function(err, results){
//         emps = results.map(names => ({
//             id: names.id,
//             fl: `${names.first_name} ${names.last_name}`
//         })) 

//     }) 
   
//     console.log(emps)
// }

// async function getRoleTitle() {
//     let roles;
//     db.query('Select title from emp_role', function(err, results) { 
//         for (i=0; i<results.length; i++) {
//             roles.push(results[i].title);
//         }
        
//     });

//     return roles
// }


// module.exports = { getEmpName, getRoleTitle };