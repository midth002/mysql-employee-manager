
-- Add Department
INSERT INTO department (dept_name) 
VALUES ('Sales'), 
       ('Software'), 
       ('HR'), 
       ('Accounting'), 
      

-- Add Role
INSERT INTO emp_role (title, salary, department_id)
VALUES ('Account Manager', 60000, 1), 
       ('Sales staff', 50000, 1), 
       ('Software Engineer', 70000, 2), 
       ('Scrum Master', 100000, 2), 
       ('Human Resource Manager', 80000, 3), 
       ('Accountant', 60000, 4), 
       ('Tax Accountant', 65000, 4),
       ('HR representative', 40000, 3);
   

-- Add Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sarah', 'Sample', 1, NULL),
       ('John', 'Doe', 2, 1),
       ('Larry', 'Lobster', 4, NULL),
       ('Timmy', 'Turner', 3, 4),
       ('Gary', 'Scott', 5, NULL),
       ('Dwight', 'Schrutte', 6, NULL),
       ('Sam', 'Surly', 7, NULL),
       ('Jenny', 'Penny', 8, 5),
       ('Taco', 'Paco', 2, 1),
       ('Bob', 'Cobb', 2, 1);