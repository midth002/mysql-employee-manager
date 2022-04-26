-- View all employees 
Select * From employee;

-- View all employees by department 
Select employee.id As emp_id, first_name, last_name, manager_id, title, salary, dept_name from employee 
Inner Join emp_role On employee.role_id = emp_role.id 
Inner Join department On emp_role.department_id = department.id
Where dept_name = 'Sales';

-- View all employees by manager
Select employee.id As emp_id, first_name, last_name, manager_id, title, salary 
From employee Inner Join emp_role On employee.role_id = emp_role.id 
Where manager_id = 1;

-- Delete employee by first_name and last_name
Delete From employee 
Where first_name = 'Bob' And last_name = 'Cobb';

-- Delete role by rmp_role.title
Delete From emp_role 
Where title = 'HR representative';

-- Delete department 
Delete From department 
Where dept_name = 'Sales';

-- Update employee role 
Update employee 
Set 

-- Update emp_role 
Update emp_role 
Set 

-- Update department 
Update department
Set 

Select  department.dept_name As Department, employee.first_name, employee.last_name, emp_role.salary
from employee join emp_role on employee.role_id = emp_role.id right join department on emp_role.department_id = department.id
Group by dept_name;


Select  department.dept_name As Department, employee.first_name, employee.last_name, emp_role.salary
from department join emp_role on department.id = emp_role.department_id join employee on emp_role.id = employee.role_id
Where dept_name = 'Sales';