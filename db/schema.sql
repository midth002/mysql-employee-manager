DROP DATABASE IF EXISTS employee_management;
CREATE DATABASE employee_management;

USE employee_management;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    dept_name VARCHAR(30)
);

CREATE TABLE emp_role ( 
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT, 
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30), 
    last_name VARCHAR(30), 
    role_id INT,
    manager_id INT DEFAULT NULL,
    FOREIGN KEY (role_id) 
    REFERENCES emp_role(id)
    ON DELETE SET NULL
);

Update employee join emp_role on employee.role_id = emp_role.id set employee.role_id = 2 Where employee.id = 5;  

Update employee join emp_role on employee.role_id = emp_role.id set employee.role_id = 