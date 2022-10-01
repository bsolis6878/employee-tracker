const db = require('../db/connection');
const cTable = require('console.table');

const allDepartments = () => {
    db.query(
        `SELECT * FROM department`,
        function(err, results) {
            if (err) {
                console.log(err);
            }
            const table = cTable.getTable(results);
            console.log(`\n${table}`);
        }
    )
}

const allRoles = () => {
    db.query(
        `SELECT role.id, role.title, role.salary, department.name
        AS department
        FROM role
        LEFT JOIN department
        ON role.department_id = department.id`,
        function(err, results) {
            if (err) {
                console.log(err);
            }
            const table = cTable.getTable(results);
            console.log(`\n${table}`);
        }
    )
}

const allEmployees = () => {
    db.query(
        `SELECT a.id, a.first_name, a.last_name, role.title, department.name AS department, role.salary, CONCAT(b.first_name, " ", b.last_name) AS manager
        FROM employee a
        LEFT JOIN role ON a.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee b ON a.manager_id = b.id`,
        function(err, results) {
            if (err) {
                console.log(err);
            }
            const table = cTable.getTable(results);
            console.log(`\n${table}`);
        }
    )
}

const addDepartment = (dept) => {
    db.query(
        `INSERT INTO department (name)
        VALUES (?)`,
        [dept],
        console.log(`Department "${dept}" added.`)
    )
}

const addRole = (role, salary, dept) => {
    db.query(
        `INSERT INTO role (title, salary, department_id)
        VALUES (?,?,?)`,
        [role, salary, dept],
        console.log(`Role "${role}" added.`)
    )
}

const addEmployee = (firstName, lastName, role, manager) => {
    db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`,
        [firstName, lastName, role, manager],
        console.log(`Employee "${firstName}" added.`)
    )
}

module.exports = { allDepartments, allRoles, allEmployees, addDepartment, addRole, addEmployee };