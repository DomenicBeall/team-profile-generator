// Load dependencies
const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");


// Create array of employees to be written
employees = [];
currentEmployeeID = 1;

inquirer.prompt([
    { type: "input", name: "name", message: "What is the managers name?" },
    { type: "input", name: "email", message: "What is the managers email?" },
    { type: "number", name: "office", message: "What is the managers office number?" }
]).then(answers => {

    employees.push(new Manager(
        answers.name,
        grabID(),
        answers.email,
        answers.office
    ));

    addEmployees();
});


function grabID() {
    currentEmployeeID += 1;
    return currentEmployeeID - 1;
}

function addEmployees() {
    inquirer.prompt([
        { type: "list", name: "type", message: "What type of employee would you like to add?", choices: ["Engineer", "Intern", "Done"] }
    ]).then(answers => {
        switch (answers.type) {
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            case "Done":
                writeHTML();
                break;
        }
    });
}

function createEngineer() {
    inquirer.prompt([
        { type: "input", name: "name", message: "What is the engineer's name?" },
        { type: "input", name: "email", message: "What is the engineer's email?" },
        { type: "input", name: "github", message: "What is the engineer's GitHub username?" }
    ]).then(answers => {
        employees.push(new Engineer(
            answers.name,
            grabID(),
            answers.email,
            answers.github
        ));

        addEmployees();
    });
}

function createIntern() {
    inquirer.prompt([
        { type: "input", name: "name", message: "What is the intern's name?" },
        { type: "input", name: "email", message: "What is the intern's email?" },
        { type: "input", name: "school", message: "What school is the intern from?" }
    ]).then(answers => {
        employees.push(new Intern(
            answers.name,
            grabID(),
            answers.email,
            answers.school
        ));

        addEmployees();
    });
}

function writeHTML() {
    
}