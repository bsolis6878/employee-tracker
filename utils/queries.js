const db = require('../db/connection');
const cTable = require('console.table');

const allDepartments = () => {
    db.query(
        `SELECT * FROM department`,
        function(err, results) {
            const table = cTable.getTable(results);
            console.log(`\n${table}`);
        }
    )
}

const allRoles = () => {
    db.query(
        `SELECT * FROM role`,
        function(err, results) {
            const table = cTable.getTable(results);
            console.log(`\n${table}`);
        }
    )
}

module.exports = { allDepartments, allRoles };