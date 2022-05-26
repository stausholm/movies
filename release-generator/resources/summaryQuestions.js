const inquirer = require("inquirer");

const summaryQuestions = [
  {
    type: "confirm",
    name: "includeSummary",
    message: "Add a summary to this release?",
    default: false,
  },
  {
    type: "editor",
    name: "summary",
    message: "Please write a few words describing what this release is about. Remember to save.",
    validate(text) {
      if (!text) {
        return "Summary can't be empty";
      }

      return true;
    },
    when(answers) {
      return answers["includeSummary"];
    },
  },
];

const getSummaryAnswers = () => {
  return inquirer.prompt(summaryQuestions);
};

module.exports = {
  getSummaryAnswers,
};
