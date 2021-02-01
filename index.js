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

    let cardHTML = "";

    for (let i = 0; i < employees.length; i++) {
        cardHTML += getEmployeeCardHTML(employees[i]);
    }

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

    // Write html to a file
    fs.writeFile("index.html", html, (err) => {
        if (err) throw err;
        console.log("Your html has been saved successfully!");
    })
}

function getEmployeeCardHTML(employee) {
    
    let li = "";
    let icon = "";

    switch (employee.getRole()) {
        case "Manager":
            li = `<li class="list-group-item">Office Number: ${employee.getOffice()}</li>`;
            icon = `<i class="fas fa-mug-hot"></i>`;
            break;
        case "Intern":
            li = `<li class="list-group-item">School: ${employee.getSchool()}</li>`;
            icon = `<i class="fas fa-user-graduate"></i>`;
            break;
        case "Engineer":
            li = `<li class="list-group-item">Github: <a href="https://www.github.com/${employee.getGithub()}">${employee.getGithub()}</a></li>`;
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
            <li class="list-group-item">Email: <a href="${employee.getEmail()}">${employee.getEmail()}</a></li>
            ${li}
            </ul>
    </div>
</div>
    `;

}