const inquirer = require('inquirer');
const { allDepartments, allRoles, allEmployees, addDepartment, addRole, addEmployee, updateEmployee, getDepartments } = require('./utils/queries');


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
        if (answer.question === 'Add a role') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'What is the name of the role?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please enter the name of the role.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of this role?',
                    validate: salaryInput => {
                        if (salaryInput) {
                            return true;
                        } else {
                            console.log('Please enter the salary of the role.');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'dept',
                    message: 'What is the department of this role?',
                    choices: getDepartments
                }
            ])
            .then((answer) => {
                addRole(answer.role, answer.salary, answer.dept);
            });
        }
        if (answer.question === 'Add an employee') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is the employee's first name?",
                    validate: firstNameInput => {
                        if (firstNameInput) {
                            return true;
                        } else {
                            console.log("Please enter the employee's first name.");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is the employee's last name?",
                    validate: lastNameInput => {
                        if (lastNameInput) {
                            return true;
                        } else {
                            console.log("Please enter the employee's last name.");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'role',
                    message: "What is the employee's role?",
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log("Please enter the employee's role.");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    validate: managerInput => {
                        if (managerInput) {
                            return true;
                        } else {
                            console.log("Please enter the employee's manager.");
                            return false;
                        }
                    }
                }
            ])
            .then((answer) => {
                addEmployee(answer.firstName, answer.lastName, answer.role, answer.manager);
            });
        }
        if (answer.question === 'Update an employee role') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'employee',
                    message: "Which employee would you like to update?",
                    validate: employeeInput => {
                        if (employeeInput) {
                            return true;
                        } else {
                            console.log("Please enter the employee you'd like to update.");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'newRole',
                    message: "What will their new role be?",
                    validate: newRoleInput => {
                        if (newRoleInput) {
                            return true;
                        } else {
                            console.log("Please enter the employee's new role.");
                            return false;
                        }
                    }
                }
            ])
            .then((answer) => {
                updateEmployee(answer.employee, answer.newRole)
            })
        }
        if (answer.question === 'Quit') {
            console.log('Thanks for dropping by!');
            process.exit();
        }
    })
    .then(optionsSelect);
};

optionsSelect();