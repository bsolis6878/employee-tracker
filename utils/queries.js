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

const getDepartments = () => {
    return new Promise(function (resolve, reject) {
        db.query(
            `SELECT * FROM department`,
            function(err, results) {
                const departments = results.map(department => department.name);
                resolve(departments);
            }
        )
    })
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

const getRoles = () => {
    return new Promise(function (resolve, reject) {
        db.query(
            `SELECT * FROM role`,
            function(err, results) {
                const roles = results.map(roles => roles.title);
                resolve(roles);
            }
        )
    })
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

const getEmployees = () => {
    return new Promise(function (resolve, reject) {
        db.query(
            `SELECT * FROM employee`,
            function(err, results) {
                const employees = results.map(employees => employees.first_name);
                resolve(employees);
            }
        )
    })
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
        function(err, results) {
            if (err) {
                console.log(err);
            }
        }
        // console.log(`Role "${role}" added.`)
    )
}

const addEmployee = (firstName, lastName, role, manager) => {
    db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`,
        [firstName, lastName, role, manager],
        function(err, results) {
            if (err) {
                console.log(err);
            }
        }
        // console.log(`Employee "${firstName}" added.`)
    )
}

const updateEmployee = (employee, newRole) => {
    db.query(
        `UPDATE employee SET role_id = ?
        WHERE first_name = ?`,
        [newRole, employee],
        function(err, results) {
            if (err) {
                console.log(err);
            }
        }
        // console.log(`Role for "${employee}" updated.`)
    )
}

module.exports = { allDepartments, allRoles, allEmployees, addDepartment, addRole, addEmployee, updateEmployee, getDepartments, getRoles, getEmployees };