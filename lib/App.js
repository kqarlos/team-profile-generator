const Employee = require("./Employee");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");

//Class handles the application process
class App {

    constructor() {

        this.employees = [];
        this.employeePrompt = [
            {
                type: "input",
                message: "What is your name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your id?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your email?",
                name: "email"
            }
        ];
        this.managerPrompt = this.employeePrompt.concat([
            {
                type: "input",
                message: "What is your office number?",
                name: "officeN"
            }
        ]);
        this.engineerPrompt = this.employeePrompt.concat([
            {
                type: "input",
                message: "What is your github?",
                name: "github"
            }
        ]);
        this.internPrompt = this.employeePrompt.concat([
            {
                type: "input",
                message: "What is your school?",
                name: "school"
            }
        ]);
        // console.log(this);
    }

    //start application
    start() {
        this.running = true;
        this.nextEmployee();
    }

    //end application
    end() {
        console.log("Team Profile Generated");
    }

    //Call to prompt for employee role. If role is "Exit". No additional employees => call to process all employees.
    //Else call to get employe info based on role, then create employee object and push to employees array
    nextEmployee() {
        this.promptRole().then((role) => {
            if (role === "Exit") {
                this.processEmployees();
                this.end();
            }
            else {
                this.promptInfo(role).then((data) => {
                    switch (role) {
                        case "Manager":
                            var employee = new Manager(data.name, data.id, data.email, data.officeN);
                            break;
                        case "Engineer":
                            var employee = new Engineer(data.name, data.id, data.email, data.github);
                            break;
                        case "Intern":
                            var employee = new Intern(data.name, data.id, data.email, data.school);
                            break;
                    }
                    this.employees.push(employee);
                    this.nextEmployee();
                });
            }
        });

    }

    //Prmopt user for employee role and return it
    promptRole() {
        return inquirer.prompt([
            {
                type: "list",
                message: "Enter your role",
                name: "role",
                choices: ["Manager", "Engineer", "Intern", "Exit"]
            }
        ]).then(function (data) {
            return (data.role);
        }).catch(function (error) {
            console.log(error);
        });
    }

    //prompt user for employee information and return it
    promptInfo(role) {
        switch (role) {
            case "Manager":
                return inquirer.prompt(this.managerPrompt).then(function (data) {
                    return data;
                });
                break;
            case "Engineer":
                return inquirer.prompt(this.engineerPrompt).then(function (data) {
                    return data;
                });
                break;
            case "Intern":
                return inquirer.prompt(this.internPrompt).then(function (data) {
                    return data;
                });
                break;
        }
    }

    //process employees info
    processEmployees() {
        this.employees.forEach(e => {
            console.log(`Processing ${e.getRole()}: ${e.name}`);
        });

    }

}


module.exports = App;