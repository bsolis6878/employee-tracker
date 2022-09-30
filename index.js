const inquirer = require('inquirer');
const { allDepartments, allRoles, allEmployees, addDepartment } = require('./utils/queries');

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
        if (answer.question === 'Add a department') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'department',
                    message: 'What is the name of the department?',
                    validate: departmentInput => {
                        if (departmentInput) {
                            return true;
                        } else {
                            console.log('Please enter the name of the department.');
                            return false;
                        }
                    }
                }
            ])
            .then((answer) => {
                addDepartment(answer.department);
            });
        }
        if (answer.question === 'Quit') {
            console.log('Thanks for dropping by!');
            process.exit();
        }
    })
    .then(optionsSelect);
};

optionsSelect();