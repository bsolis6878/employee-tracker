const inquirer = require('inquirer');

const optionsSelect = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'continue',
            message: "Welcome to the employee tracker! Select an option below to continue.",
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ])
}

optionsSelect();