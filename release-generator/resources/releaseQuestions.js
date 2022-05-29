const { RELEASE_TYPES, TODAY } = require("./constants");
const inquirer = require("inquirer");
const chalk = require("chalk");

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

const getReleaseQuestions = (currentVersion) => {
  return [
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
      filter(val) {
        return {
          type: val,
          version: getNextSemanticVersion(currentVersion, val).full,
        };
      },
    },
  ];
};

const getReleaseAnswers = (currentVersion) => {
  return inquirer.prompt(getReleaseQuestions(currentVersion));
};

module.exports = {
  getNextSemanticVersion,
  getReleaseAnswers,
};
