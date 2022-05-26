#!/usr/bin/env node

const log = console.log;
const inquirer = require("inquirer");
const chalk = require("chalk");
const siteSettings = require("../frontend/movies-frontend/src/constants/SiteSettings.json");
const currentVersion = siteSettings.APP_VERSION;

log(chalk.bgCyan.black("  Remember to generate a release before building for production  "));
log("This utility will walk you through creating a release.");
log("It only covers the most common features. For more control, manual edits to the outputted files are requried.");
log("Press ^C at any time to quit");

const RELEASE_TYPES = {
  MAJOR: "MAJOR",
  MINOR: "MINOR",
  PATCH: "PATCH",
};

const CHANGE_TYPES = {
  ADDED: "added",
  CHANGED: "changed",
  DEPRECATED: "deprecated",
  REMOVED: "removed",
  FIXED: "fixed",
  SECURITY: "security",
};

const TODAY = new Date().toISOString().substring(0, 10);

const getNextSemanticVersion = (currentVersion, bumpType) => {
  let [major, minor, patch] = currentVersion.split(".").map((x) => parseInt(x));
  switch (bumpType) {
    case RELEASE_TYPES.MAJOR:
      major += 1;
      break;
    case RELEASE_TYPES.MINOR:
      minor += 1;
      break;
    case RELEASE_TYPES.PATCH:
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
    case RELEASE_TYPES.MAJOR:
      major = chalk.bold.underline(major);
      break;
    case RELEASE_TYPES.MINOR:
      minor = chalk.bold.underline(minor);
      break;
    case RELEASE_TYPES.PATCH:
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
        name: `MAJOR (When you make incompatible API changes) ${getFormattedVersionBumpText(currentVersion, RELEASE_TYPES.MAJOR)}`,
        value: RELEASE_TYPES.MAJOR,
        short: `MAJOR ${chalk.gray("(" + getNextSemanticVersion(currentVersion, RELEASE_TYPES.MAJOR).full + ")")}`,
      },
      {
        name: `MINOR (When you add functionality in a backwards compatible manner) ${getFormattedVersionBumpText(
          currentVersion,
          RELEASE_TYPES.MINOR
        )}`,
        value: RELEASE_TYPES.MINOR,
        short: `MINOR ${chalk.gray("(" + getNextSemanticVersion(currentVersion, RELEASE_TYPES.MINOR).full + ")")}`,
      },
      {
        name: `PATCH (When you make backwards compatible bugfixes) ${getFormattedVersionBumpText(currentVersion, RELEASE_TYPES.PATCH)}`,
        value: RELEASE_TYPES.PATCH,
        short: `PATCH ${chalk.gray("(" + getNextSemanticVersion(currentVersion, RELEASE_TYPES.PATCH).full + ")")}`,
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

inquirer.prompt(releaseQuestions).then((releaseAnswers) => {
  //log(JSON.stringify(releaseAnswers, null, "  "));

  inquirer.prompt(changelogQuestions).then((changelogAnswerTypes) => {
    //log(JSON.stringify(changelogAnswerTypes, null, "  "));

    if (changelogAnswerTypes.changeTypes) {
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
        const security = hasType(CHANGE_TYPES.SECURITY) ? await ask(addMorePrompt("List all Security related changes.")) : null;

        return {
          added,
          changed,
          deprecated,
          removed,
          fixed,
          security,
        };
      };

      getChangelogAnswers().then((changelogAnswers) => {
        inquirer.prompt(summaryQuestions).then((summaryAnswers) => {
          // log(JSON.stringify(summaryAnswers, null, "  "));
          const output = {
            nextVersion: getNextSemanticVersion(currentVersion, releaseAnswers.releaseType).full,
            releaseType: releaseAnswers.releaseType,
            releaseDate: releaseAnswers.releaseDate,
            changes: changelogAnswers,
            summary: summaryAnswers.summary || null,
            releaseNotesMarkdownString: null,
          };

          const writeChangeToMarkdown = (changeType, changeTypeLabel) => {
            if (output.changes[changeType]) {
              const list = output.changes[changeType].map((x) => `- ${x}`).join("\n");
              const label = changeTypeLabel + "\n";
              return label + list + "\n";
            }
            return "";
          };
          const writeChangeToConsole = (changeType, changeTypeLabel) => {
            if (output.changes[changeType]) {
              const list = output.changes[changeType].map((x) => `${chalk.blue("-")} ${x}`).join("\n");
              const label = chalk.blue("### " + changeTypeLabel) + "\n";
              return label + list + "\n";
            }
            return "";
          };
          const concatenateOutputToMarkdown = () => {
            return (
              `## [${output.nextVersion}] *${output.releaseDate}* \n` +
              `${output.summary ? output.summary + "\n\n" : "\n"}` +
              `${output.changes.added ? writeChangeToMarkdown("added", "Added") + "\n" : ""}` +
              `${output.changes.changed ? writeChangeToMarkdown("changed", "Changed") + "\n" : ""}` +
              `${output.changes.deprecated ? writeChangeToMarkdown("deprecated", "Deprecated") + "\n" : ""}` +
              `${output.changes.removed ? writeChangeToMarkdown("removed", "Removed") + "\n" : ""}` +
              `${output.changes.fixed ? writeChangeToMarkdown("fixed", "Fixed") + "\n" : ""}` +
              `${output.changes.security ? writeChangeToMarkdown("security", "Security") + "\n" : ""}`
            );
          };

          const confirmQuestion = {
            type: "confirm",
            name: "confirmRelease",
            message:
              chalk.bold(`Confirm release ${output.nextVersion}? \n`) +
              chalk.bgGreen("                          RELEASE NOTES                          \n\n") +
              chalk.blue(`## [${chalk.yellow(output.nextVersion)}] *${chalk.italic(output.releaseDate)}* \n`) +
              `${output.summary ? output.summary + "\n\n" : "\n"}` +
              `${output.changes.added ? writeChangeToConsole("added", "Added") + "\n" : ""}` +
              `${output.changes.changed ? writeChangeToConsole("changed", "Changed") + "\n" : ""}` +
              `${output.changes.deprecated ? writeChangeToConsole("deprecated", "Deprecated") + "\n" : ""}` +
              `${output.changes.removed ? writeChangeToConsole("removed", "Removed") + "\n" : ""}` +
              `${output.changes.fixed ? writeChangeToConsole("fixed", "Fixed") + "\n" : ""}` +
              `${output.changes.security ? writeChangeToConsole("security", "Security") + "\n" : ""}` +
              chalk.bgGreen("                                                                 \n") +
              chalk.bold(`Confirm release ${output.nextVersion}?`),
          };

          output.releaseNotesMarkdownString = concatenateOutputToMarkdown();

          inquirer.prompt(confirmQuestion).then((confirmAnswer) => {
            if (confirmAnswer.confirmRelease) {
              log("MODIFY FILES", output); // TODO: write to files
            } else {
              log(chalk.bgCyan.black("  Release aborted  "));
            }
          });
        });
      });
    }
  });
});
