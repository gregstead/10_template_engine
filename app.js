const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const prompt = inquirer.createPromptModule();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employeesArr = [];

const firstQuestion = [
    {
        type: 'list',
        name: 'employeeRole',
        message: 'What type of employee would you like to add?',
        choices: ['manager', 'engineer', 'intern'],
    },
];

const employeeQuestions = [
    {
        type: 'input',
        name: 'employeeName',
        message: `What is the employee's name?`,
    },
    {
        type: 'input',
        name: 'employeeEmail',
        message: `What is the employee's email address?`,
    },
    {
        type: 'input',
        name: 'employeeId',
        message: `What is the employee's ID number?`
    },
];

const managerQuestions = [
    {
        type: 'input',
        name: 'officeNumber',
        message: `What is the manager's office number?`
    },
];

const engineerQuestions = [
    {
        type: 'input',
        name: 'gitHubUsername',
        message: `What is the engineer's GitHub username?`
    },
];

const internQuestions = [
    {
        type: 'input',
        name: 'internSchool',
        message: `Where did the intern go to school?`,
    },
];

const lastQuestion = [
    {
        type: 'confirm',
        name: 'addAnother',
        message: `Would you like to add another employee?`

    }
];

function startApp() {
    prompt(firstQuestion)
        .then((res) => {
            switch (res.employeeRole) {
                case 'manager':
                    managerPrompt();
                    break;
                case 'engineer':
                    engineerPrompt();
                    break;
                case 'intern':
                    internPrompt();
                    break;
            }
        });
};

function managerPrompt() {
    prompt(employeeQuestions.concat(managerQuestions, lastQuestion))
        .then(res => {
            employeesArr.push(new Manager(res.employeeName, res.employeeId, res.employeeEmail, res.officeNumber))
            res.addAnother ? startApp() : outputFile();
        });
};

function engineerPrompt() {
    prompt(employeeQuestions.concat(engineerQuestions, lastQuestion))
        .then(res => {
            employeesArr.push(new Engineer(res.employeeName, res.employeeId, res.employeeEmail, res.gitHubUsername))

            res.addAnother ? startApp() : outputFile();
        });
};

function internPrompt() {
    prompt(employeeQuestions.concat(internQuestions, lastQuestion))
        .then(res => {
            employeesArr.push(new Intern(res.employeeName, res.employeeId, res.employeeEmail, res.internSchool))
            res.addAnother ? startApp() : outputFile();
        });
}

function outputFile() {
    fs.writeFileSync(outputPath, render(employeesArr))
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


startApp();