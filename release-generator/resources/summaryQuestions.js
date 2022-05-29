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
  {
    // BUG
    // https://github.com/SBoudrias/Inquirer.js/issues/1070
    // This dummy question needs to be here, since a question of type "editor", causes the following questions to hang, and prevents the node process from exiting,
    // if the "editor" question is the last object in a questions array.
    type: "confirm",
    name: "continueBug",
    message: "Press enter to continue",
    default: true,
    when(answers) {
      return answers["summary"];
    },
  },
];

const getSummaryAnswers = () => {
  return inquirer.prompt(summaryQuestions);
};

module.exports = {
  getSummaryAnswers,
};
