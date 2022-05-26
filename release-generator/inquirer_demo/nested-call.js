const inquirer = require("inquirer");

inquirer
  .prompt({
    type: "list",
    name: "chocolate",
    message: "What's your favorite chocolate?",
    choices: ["Mars", "Oh Henry", "Hershey"],
  })
  .then((answer1) => {
    inquirer
      .prompt({
        type: "list",
        name: "beverage",
        message: "And your favorite beverage?",
        choices: ["Pepsi", "Coke", "7up", "Mountain Dew", "Red Bull"],
      })
      .then((answer2) => {
        console.log(JSON.stringify(Object.assign(answer1, answer2), null, "  "));
      });
  });
