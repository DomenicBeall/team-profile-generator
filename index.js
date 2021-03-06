// Load dependencies
const fs = require("fs");
const inquirer = require("inquirer");

// Create class references
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");


employees = []; // Store array of employees to be added to html
currentEmployeeID = 1;

// Prompt user for managers information
inquirer.prompt([

    { type: "input", name: "name", message: "What is the managers name?" },
    { type: "input", name: "email", message: "What is the managers email?" },
    { type: "number", name: "office", message: "What is the managers office number?" }

]).then(answers => {

    // Add new manager to list of employees
    employees.push(new Manager(
        answers.name,
        grabID(),
        answers.email,
        answers.office
    ));

    // Prompt user to add another employee or finish adding employees
    addEmployees();
});

// Returns the current id and iterates it by 1
function grabID() {
    currentEmployeeID += 1;
    return currentEmployeeID - 1;
}

// Prompts the user to add a new employee
function addEmployees() {

    // Prompt user to add another employee or finish adding employees
    inquirer.prompt([
        { type: "list", name: "type", message: "What type of employee would you like to add?", choices: ["Engineer", "Intern", "Done"] }
    ]).then(answers => {

        // Either prompt the user to add the selected employee type or break them from the loop
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

// Adds an engineer to the list of employees
function createEngineer() {

    // Prompt the user for the new engineers details
    inquirer.prompt([

        { type: "input", name: "name", message: "What is the engineer's name?" },
        { type: "input", name: "email", message: "What is the engineer's email?" },
        { type: "input", name: "github", message: "What is the engineer's GitHub username?" }
    
    ]).then(answers => {
        
        // Add a new engineer to the employees array
        employees.push(new Engineer(
            answers.name,
            grabID(),
            answers.email,
            answers.github
        ));

        // Prompt user to add another employee
        addEmployees();
    });
}

// Adds an intern to the list of employees
function createIntern() {

    // Prompt user for the new interns details
    inquirer.prompt([

        { type: "input", name: "name", message: "What is the intern's name?" },
        { type: "input", name: "email", message: "What is the intern's email?" },
        { type: "input", name: "school", message: "What school is the intern from?" }

    ]).then(answers => {

        // Add a new intern to the employees array
        employees.push(new Intern(
            answers.name,
            grabID(),
            answers.email,
            answers.school
        ));

        // Prompt user to add another employee
        addEmployees();
    });
}

// Writes generated html to a file
function writeHTML() {
    fs.writeFile("./dist/index.html", generateHTML(), (err) => {
        if (err) throw err; // Throw an error if the write failed

        console.log("Your html has been saved successfully!"); // Otherwise notify the user that the file has been saved
    })
}

// Adds cards to some template html
function generateHTML() {

    // Variable to keep track of the html of the cards
    let cardHTML = "";

    // Iterate through each employee and generate their card html
    for (let i = 0; i < employees.length; i++) {
        cardHTML += getEmployeeCardHTML(employees[i]);
    }

    // Store the html to be written
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- Bootstrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        <link href="./style.css" rel="stylesheet">
    
        <title>My Team</title>

        <!-- Font Awesome Kit -->
        <script src="https://kit.fontawesome.com/5c8c766aa1.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <header class="bg-danger">
            <h1>My Team</h1>
        </header>

        <div class="container">
            <div class="row">
                ${cardHTML}
            </div>
        </div>
    </body>
    <style>
        header {
            text-align: center;
            padding: 50px;
            margin-bottom: 20px;
            background-color: orange;
            color: white;
        }

        .card {
            margin-top: 20px;
            padding: 0px;
        }
    </style>
    </html>
    `;

    return html;
}

// Generates the html for an employee card
function getEmployeeCardHTML(employee) {
    
    let typespecificli = "";
    let icon = "";

    // Set the above variables to their class specific value
    switch (employee.getRole()) {
        case "Manager":
            typespecificli = `<li class="list-group-item">Office Number: ${employee.getOffice()}</li>`;
            icon = `<i class="fas fa-mug-hot"></i>`;
            break;
        case "Intern":
            typespecificli = `<li class="list-group-item">School: ${employee.getSchool()}</li>`;
            icon = `<i class="fas fa-user-graduate"></i>`;
            break;
        case "Engineer":
            typespecificli = `<li class="list-group-item">GitHub: <a href="https://www.github.com/${employee.getGithub()}">${employee.getGithub()}</a></li>`;
            icon = `<i class="fas fa-glasses"></i>`;
            break;
    }

    return `
<div class="card shadow mx-auto" style="width: 18rem;">
    <div class="card-header bg-primary text-white">
        <h2>${employee.getName()}</h2>
        <h4>${icon} ${employee.getRole()}</h4>
    </div>

    <div class="card-body bg-light">
        <ul class="list-group">
            <li class="list-group-item">ID: ${employee.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
            ${typespecificli}
            </ul>
    </div>
</div>
    `;

}