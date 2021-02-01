// Load dependencies
const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Manager");


// Create array of employees to be written
employees = [];
currentEmployeeID = 1;

// Create a variable to store the html

// Ask the user for the managers details and append the relevant html
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

    // Ask the user which employee type is being added
    inquirer.prompt([
        { type: "list", name: "type", message: "What type of employee would you like to add?", choices: ["Engineer", "Intern", "Quit"] }
    ]).then(answers => {

    });


});


// Switch statement to ask different questions depending on the employee type
// Append a new card to the html for each response

// Generate HTML based on responses

function grabID() {
    currentEmployeeID += 1;
    return currentEmployeeID - 1;
}
