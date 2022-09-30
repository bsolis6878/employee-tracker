const inquirer = require('inquirer');
const { allDepartments, allRoles, allEmployees } = require('./utils/queries');

const optionsSelect = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'question',
            message: "Welcome to the employee tracker! Select an option below to continue.",
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
        }
    ])
    .then((answer) => {
        if (answer.question === 'View all departments') {
            allDepartments();
        }
        if (answer.question === 'View all roles') {
            allRoles();
        }
        if (answer.question === 'View all employees') {
            allEmployees();
        }
        if (answer.question === 'Quit') {
            console.log('Thanks for dropping by!');
            process.exit();
        }
    })
    .then(optionsSelect);
};

optionsSelect();