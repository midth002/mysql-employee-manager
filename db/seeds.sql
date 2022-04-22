CREATE DATABASE employee_management;

use employee_management;

create table department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR (30) NOT NULL
);

create table employee_role (
    id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30), 
    salary DECIMAL(10,2), 
    department_id INT NOT NULL, 
    FOREIGN KEY (department_id) REFERENCES department(id)
);

create table employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT DEFAULT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);