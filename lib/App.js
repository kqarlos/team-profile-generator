const Employee = require("./Employee");
const inquirer = require("inquirer");

class App {

    constructor() {
        this.running = false;
    }

    start() {
        this.running = true;
        this.promptRole(this);
    }

    end() {
        console.log("Team Profile Generated");
    }

    promptRole(that) {
        inquirer.prompt([
            {
                type: "list",
                message: "Enter your role",
                name: "role",
                choices: ["Manager", "Engineer", "Intern", "Exit"]
            }
        ]).then(function (data) {
            var role = data.role;
            if (role === "Exit") {
                that.end();
            }
            else {
                that.promptInfo(role);
                that.promptRole(that);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    promptInfo(role) {
        console.log(`Adding ${role}`);
        switch (role) {
            case "Manager":
                break;
            case "Engineer":
                break;
            case "Intern":
                break;
        }
    }

}

// App.prototype.promptInfo = function (role) {
//     console.log(`Adding ${role}`);
//     switch (role) {
//         case "Manager":
//             break;
//         case "Engineer":
//             break;
//         case "Intern":
//             break;
//     }
// }
// App.prototype.promptRole = function(){
//     inquirer.prompt([
//         {
//             type: "list",
//             message: "Enter your role",
//             name: "role",
//             choices: ["Manager", "Engineer", "Intern", "Exit"]
//         }
//     ]).then(function (data) {
//         var role = data.role;
//         if (role === "Exit") {
//             this.end()
//         }
//         else {
//             this.promptInfo(role);
//             this.promptRole();
//         }
//     });
// }


module.exports = App;