#!/usr/bin/env node

const log = console.log;
const inquirer = require("inquirer");
const chalk = require("chalk");
const siteSettings = require("../frontend/movies-frontend/src/constants/SiteSettings.json");
const currentVersion = siteSettings.APP_VERSION;

log("This utility will walk you through creating a release.");
log("It only covers the most common features. For more control, manual edits are requried.");
log("Press ^C at any time to quit");

const TYPES = {
  MAJOR: "MAJOR",
  MINOR: "MINOR",
  PATCH: "PATCH",
};

const TODAY = new Date().toISOString().substring(0, 10);

const getNextSemanticVersion = (currentVersion, bumpType) => {
  let [major, minor, patch] = currentVersion.split(".").map((x) => parseInt(x));
  switch (bumpType) {
    case TYPES.MAJOR:
      major += 1;
      break;
    case TYPES.MINOR:
      minor += 1;
      break;
    case TYPES.PATCH:
      patch += 1;
      break;
    default:
      break;
  }
  return {
    full: `${major}.${minor}.${patch}`,
    major,
    minor,
    patch,
  };
};

const getFormattedVersionBumpText = (currentVersion, bumpType) => {
  let { major, minor, patch } = getNextSemanticVersion(currentVersion, bumpType);
  switch (bumpType) {
    case TYPES.MAJOR:
      major = chalk.bold.underline(major);
      break;
    case TYPES.MINOR:
      minor = chalk.bold.underline(minor);
      break;
    case TYPES.PATCH:
      patch = chalk.bold.underline(patch);
      break;
    default:
      break;
  }

  return chalk.gray(`${currentVersion} → ${major}.${minor}.${patch}`);
};

const releaseQuestions = [
  {
    type: "input",
    name: "releaseDate",
    message: "Date of release (YYYY-MM-DD):",
    default() {
      return TODAY;
    },
    validate(value) {
      const pass = value.match(/^(20[0-9]{2})-([01]{1}[0-9]{1})-([0123]{1}[0-9]{1})$/i);
      if (pass && !isNaN(new Date(value).getDate())) {
        return true;
      }

      return "Please enter a valid date";
    },
  },
  {
    type: "list",
    name: "releaseType",
    message: "Type of release:",
    choices: [
      {
        name: `MAJOR (When you make incompatible API changes) ${getFormattedVersionBumpText(
          currentVersion,
          TYPES.MAJOR
        )}`,
        value: TYPES.MAJOR,
        short: `MAJOR ${chalk.gray(
          "(" + getNextSemanticVersion(currentVersion, TYPES.MAJOR).full + ")"
        )}`,
      },
      {
        name: `MINOR (When you add functionality in a backwards compatible manner) ${getFormattedVersionBumpText(
          currentVersion,
          TYPES.MINOR
        )}`,
        value: TYPES.MINOR,
        short: `MINOR ${chalk.gray(
          "(" + getNextSemanticVersion(currentVersion, TYPES.MINOR).full + ")"
        )}`,
      },
      {
        name: `PATCH (When you make backwards compatible bugfixes) ${getFormattedVersionBumpText(
          currentVersion,
          TYPES.PATCH
        )}`,
        value: TYPES.PATCH,
        short: `PATCH ${chalk.gray(
          "(" + getNextSemanticVersion(currentVersion, TYPES.PATCH).full + ")"
        )}`,
      },
    ],
  },
];

const changelogQuestions = [
  {
    type: "checkbox",
    name: "changeTypes",
    message: "Types of changes in release:",
    choices: [
      {
        name: "Added (for new features)",
        value: "added",
        short: "Added",
      },
      {
        name: "Changed (for changes in existing functionality)",
        value: "changed",
        short: "Changed",
      },
      {
        name: "Deprecated (for soon-to-be removed features)",
        value: "deprecated",
        short: "Deprecated",
      },
      {
        name: "Removed (for now removed features)",
        value: "removed",
        short: "Removed",
      },
      {
        name: "Fixed (for any bug fixes)",
        value: "fixed",
        short: "Fixed",
      },
      {
        name: "Security (in case of vulnerabilities)",
        value: "security",
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
    type: "confirm",
    name: "confirmRelease",
    message: `${chalk.bold(`Confirm release ${"todo 1.2.3"}?`)}
${chalk.bgGreen("                          RELEASE NOTES                          ")}

${chalk.blue(`## [${chalk.yellow("todo 1.2.3")}] *${chalk.italic("todo date")}*`)}
This is an optional summary added

${chalk.blue("### Added")}
${chalk.blue("-")} lorem ipsum dolor sit amet
${chalk.blue("-")} lorem ipsum dolor asdasd kdfh dkfgh d

${chalk.blue("### Changed")}
${chalk.blue("-")} loasda rem ipsum dolor sit amet
${chalk.blue("-")} lo rasdasdem ipsum dolor asdasd kdfh dkfgh d

${chalk.bgGreen("                                                                 ")}
${chalk.bold(`Confirm release ${"todo 1.2.3"}?`)}`,
  },
];

const changes = {
  added: [], // array of strings (markdown)
  changed: [],
  deprecated: [],
  removed: [],
  fixed: [],
  security: [],
};

const addMorePrompt = {
  type: "confirm",
  name: "askAgain",
  message: "Want to enter another todo X (just hit enter for YES)?",
  default: true,
};

inquirer.prompt(releaseQuestions).then((releaseAnswers) => {
  log(JSON.stringify(releaseAnswers, null, "  "));

  inquirer.prompt(changelogQuestions).then((changelogAnswers) => {
    log(JSON.stringify(changelogAnswers, null, "  "));

    if (changelogAnswers.changeTypes) {
      changelogAnswers.changeTypes.forEach((changeType) => {
        // message: "List all new features added. Press <enter> to add multiple"
        // on <enter> show addMorePrompt
        log(changeType);
      });
    }

    inquirer.prompt(summaryQuestions).then((summaryAnswers) => {
      log(JSON.stringify(summaryAnswers, null, "  "));
    });
  });
});
