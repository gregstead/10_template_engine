// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const fs = require('fs');
const Employee = require(__dirname + '/Employee.js');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    };

    getRole() {
        return 'Engineer';
    };

    getGithub() {
        return this.github;
    };
};

module.exports = Engineer;