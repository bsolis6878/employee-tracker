const db = require('../db/connection');
const cTable = require('console.table');

const allDepartments = () => {
    db.query(
        `SELECT * FROM department`,
        function(err, results) {
            if (err) {
                console.log(err);
                return;
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
                if (err) {
                    console.log(err);
                    return;
                }
                const departments = results.map(department => department.name);
                resolve(departments);
            }
        )
    })
}

const addDepartment = (dept) => {
    db.query(
        `INSERT INTO department (name)
        VALUES (?)`,
        [dept],
        function(err, results) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Department "${dept}" added.`)
        }
    )
}

const deleteDepartment = (department) => {
    db.query(
        `DELETE FROM department
        WHERE department.name = ?`,
        [department],
        function(err, results) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`${department} deleted successfully.`)
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
                return;
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
                if (err) {
                    console.log(err);
                    return;
                }
                const roles = results.map(roles => roles.title);
                resolve(roles);
            }
        )
    })
}

const addRole = (role, salary, dept) => {
    db.query(
        `SELECT department_id
        FROM role
        LEFT JOIN department
        ON role.department_id = department.id
        WHERE department.name = ?`,
        [dept],
        function(err, results) {
            if (err) {
                console.log(err);
                return;
            }
            let departments = results[0].department_id;
            db.query(
                `INSERT INTO role (title, salary, department_id)
                VALUES (?,?,?)`,
                [role, salary, departments],
                function(err, results) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Role "${role}" added.`)
                }
            )
        }
    )
}

const deleteRole = (role) => {
    db.query(
        `DELETE FROM role
        WHERE role.title = ?`,
        [role],
        function(err, results) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`${role} deleted successfully.`)
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
                return;
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
                if (err) {
                    console.log(err);
                    return;
                }
                const employees = results.map(employees => employees.first_name);
                resolve(employees);
            }
        )
    })
}

const addEmployee = (firstName, lastName, roles, managers) => {
    db.query(
        `SELECT role.id
        FROM employee
        JOIN role
        ON role_id = role.id
        WHERE role.title = ?;`,
        [roles],
        function(err, results) {
            if (err) {
                console.log(err);
            }
            let role = results[0].id;
            db.query(
                `SELECT a.manager_id
                FROM employee a, employee b
                WHERE a.manager_id = b.id
                AND b.first_name = ?;`,
                [managers],
                function(err, results) {
                    if (err) {
                        console.log(err);
                    }
                    let manager = results[0].manager_id;
                    db.query(
                        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?,?,?,?)`,
                        [firstName, lastName, role, manager],
                        function(err, results) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            console.log(`Employee "${firstName}" added.`)
                        }
                    )
                }
            )
        }
    )
}

const updateEmployee = (employee, newRole) => {
    db.query(
        `SELECT role.id
        FROM employee
        JOIN role
        ON role_id = role.id
        WHERE role.title = ?;`,
        [newRole],
        function(err, results) {
            if (err) {
                console.log(err);
                return;
            }
            let role = results[0].id;
            db.query(
                `UPDATE employee SET role_id = ?
                WHERE first_name = ?`,
                [role, employee],
                function(err, results) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(`Role for "${employee}" updated.`)
                }
            )
        }
    )
}

const deleteEmployee = (employee) => {
    db.query(
        `DELETE FROM employee
        WHERE employee.first_name = ?`,
        [employee],
        function(err, results) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`${employee} deleted successfully.`)
        }
    )
}

const getManagers = () => {
    return new Promise(function (resolve, reject) {
        db.query(
            `SELECT first_name
            FROM employee
            WHERE manager_id IS NULL`,
            function(err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                const managers = results.map(managers => managers.first_name);
                resolve(managers);
            }
        )
    })
}

module.exports = { allDepartments, allRoles, allEmployees, addDepartment, addRole, addEmployee, updateEmployee, getDepartments, getRoles, getEmployees, getManagers, deleteDepartment, deleteRole, deleteEmployee };