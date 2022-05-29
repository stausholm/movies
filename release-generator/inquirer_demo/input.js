/**
 * Input prompt example
 */

"use strict";
const inquirer = require("inquirer");
//  const chalkPipe = require('chalk-pipe');

const questions = [
  {
    type: "input",
    name: "first_name",
    message: "What's your first name",
  },
  {
    type: "input",
    name: "last_name",
    message: "What's your last name",
    default() {
      return "Doe";
    },
  },
  {
    type: "input",
    name: "fav_color",
    message: "What's your favorite color",
    transformer(color, answers, flags) {
      const text = color; //chalkPipe(color)(color);
      if (flags.isFinal) {
        return text + "!";
      }

      return text + " transformer";
    },
  },
  {
    type: "input",
    name: "phone",
    message: "What's your phone number",
    validate(value) {
      const pass = value.match(/^([0-9]+)$/i);
      if (pass) {
        return true;
      }

      return "Please enter a valid phone number";
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(JSON.stringify(answers, null, "  "));
});
