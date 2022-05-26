const { CHANGE_TYPES } = require("./constants");
const inquirer = require("inquirer");

const changelogQuestions = [
  {
    type: "checkbox",
    name: "changeTypes",
    message: "Types of changes in release:",
    choices: [
      {
        name: "Added (for new features)",
        value: CHANGE_TYPES.ADDED,
        short: "Added",
      },
      {
        name: "Changed (for changes in existing functionality)",
        value: CHANGE_TYPES.CHANGED,
        short: "Changed",
      },
      {
        name: "Deprecated (for soon-to-be removed features)",
        value: CHANGE_TYPES.DEPRECATED,
        short: "Deprecated",
      },
      {
        name: "Removed (for now removed features)",
        value: CHANGE_TYPES.REMOVED,
        short: "Removed",
      },
      {
        name: "Fixed (for any bug fixes)",
        value: CHANGE_TYPES.FIXED,
        short: "Fixed",
      },
      {
        name: "Security (in case of vulnerabilities)",
        value: CHANGE_TYPES.SECURITY,
        short: "Security",
      },
    ],
    validate(answer) {
      if (answer.length < 1) {
        return "You must choose at least one type of change.";
      }

      return true;
    },
  },
];

const addMorePrompt = (message = "List all included in the release.") => {
  return [
    {
      type: "input",
      name: "changePrompt",
      message: message + " Press enter to add multiple.",
    },
    {
      type: "confirm",
      name: "askAgain",
      message: "Want to enter another (just hit enter for YES)?",
      default: true,
    },
  ];
};

const getChangelogAnswers = () => {
  return new Promise((resolveAnswers) => {
    inquirer.prompt(changelogQuestions).then((changelogAnswerTypes) => {
      const types = changelogAnswerTypes.changeTypes;
      const hasType = (type) => types.includes(type);

      const ask = (questions) => {
        const output = [];
        const askFunc = (resolveFunc) => {
          inquirer.prompt(questions).then((answers) => {
            if (answers.changePrompt) {
              output.push(answers.changePrompt);
            }
            if (answers.askAgain) {
              askFunc(resolveFunc);
            } else {
              resolveFunc(output.length > 0 ? output : null);
            }
          });
        };
        return new Promise((resolve) => {
          askFunc(resolve);
        });
      };

      const getChangelogAnswers = async () => {
        const added = hasType(CHANGE_TYPES.ADDED) ? await ask(addMorePrompt("List all new features added.")) : null;
        const changed = hasType(CHANGE_TYPES.CHANGED) ? await ask(addMorePrompt("List all changes to existing functionality.")) : null;
        const deprecated = hasType(CHANGE_TYPES.DEPRECATED) ? await ask(addMorePrompt("List all new deprecations.")) : null;
        const removed = hasType(CHANGE_TYPES.REMOVED) ? await ask(addMorePrompt("List all now removed features.")) : null;
        const fixed = hasType(CHANGE_TYPES.FIXED) ? await ask(addMorePrompt("List all fixed bugs.")) : null;
        const security = hasType(CHANGE_TYPES.SECURITY) ? await ask(addMorePrompt("List all security related changes.")) : null;

        return {
          added,
          changed,
          deprecated,
          removed,
          fixed,
          security,
        };
      };

      getChangelogAnswers().then((changelogAnswers) => resolveAnswers(changelogAnswers));
    });
  });
};

module.exports = {
  getChangelogAnswers,
};
