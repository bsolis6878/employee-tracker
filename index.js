const inquirer = require('inquirer');
const db = require('./db/connection');

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
            console.log('Test');
        }
        if (answer.question === 'Quit') {
            console.log('Thanks for dropping by!');
            process.exit();
        }
    })
    .then(optionsSelect);
};

optionsSelect();