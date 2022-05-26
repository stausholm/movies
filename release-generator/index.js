#!/usr/bin/env node

const log = console.log;
const inquirer = require("inquirer");
const chalk = require("chalk");
const { getReleaseAnswers, getNextSemanticVersion } = require("./resources/releaseQuestions");
const { getChangelogAnswers } = require("./resources/changelogQuestions");
const { getSummaryAnswers } = require("./resources/summaryQuestions");
const { SaveToFileSync, SAVE_MODES, updateJSONValue } = require("./resources/saveToFile");

/* ################################################################### */
// FILES TO WRITE TO (relative path from this file - index.js):
const CHANGELOG_PATH = "../frontend/movies-frontend/src/changelog/changelog.md"; // changelog shown in the frontend
const RELEASE_LOG_PATH = "./release.json"; // a JSON summary of the release
const SITE_SETTINGS_PATH = "../frontend/movies-frontend/src/constants/SiteSettings.json"; // version numbering shown in the frontend

const siteSettingsImport = require(SITE_SETTINGS_PATH);
const currentVersion = siteSettingsImport.APP_VERSION;
/* ################################################################### */

log(chalk.bgCyan.black("  Remember to generate a release before building for production  "));
log("This utility will walk you through creating a release.");
log("It only covers the most common features. For more control, manual edits to the outputted files are requried.");
log("Press ^C at any time to quit");

getReleaseAnswers(currentVersion).then((releaseAnswers) => {
  //log(JSON.stringify(releaseAnswers, null, "  "));
  getChangelogAnswers().then((changelogAnswers) => {
    getSummaryAnswers().then((summaryAnswers) => {
      const output = {
        version: getNextSemanticVersion(currentVersion, releaseAnswers.releaseType).full,
        releaseType: releaseAnswers.releaseType,
        releaseDate: releaseAnswers.releaseDate,
        changes: changelogAnswers,
        summary: summaryAnswers.summary || null,
        releaseNotesMarkdownString: null,
      };

      const writeChangeToMarkdown = (changeType, changeTypeLabel) => {
        if (output.changes[changeType]) {
          const list = output.changes[changeType].map((x) => `- ${x}`).join("\n");
          const label = "### " + changeTypeLabel + "\n";
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
          `## [${output.version}] *${output.releaseDate}* \n` +
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
          chalk.bold(`Confirm release ${output.version}? \n`) +
          chalk.bgGreen("                          RELEASE NOTES                          \n\n") +
          chalk.blue(`## [${chalk.yellow(output.version)}] *${chalk.italic(output.releaseDate)}* \n`) +
          `${output.summary ? output.summary + "\n\n" : "\n"}` +
          `${output.changes.added ? writeChangeToConsole("added", "Added") + "\n" : ""}` +
          `${output.changes.changed ? writeChangeToConsole("changed", "Changed") + "\n" : ""}` +
          `${output.changes.deprecated ? writeChangeToConsole("deprecated", "Deprecated") + "\n" : ""}` +
          `${output.changes.removed ? writeChangeToConsole("removed", "Removed") + "\n" : ""}` +
          `${output.changes.fixed ? writeChangeToConsole("fixed", "Fixed") + "\n" : ""}` +
          `${output.changes.security ? writeChangeToConsole("security", "Security") + "\n" : ""}` +
          chalk.bgGreen("                                                                 \n") +
          chalk.bold(`Confirm release ${output.version}?`),
      };

      output.releaseNotesMarkdownString = concatenateOutputToMarkdown();

      inquirer.prompt(confirmQuestion).then((confirmAnswer) => {
        if (confirmAnswer.confirmRelease) {
          log(chalk.bgGreen(`  Updating files to release ${output.version}:  `));
          SaveToFileSync(RELEASE_LOG_PATH, JSON.stringify(output), SAVE_MODES.WRITE);
          SaveToFileSync(CHANGELOG_PATH, output.releaseNotesMarkdownString, SAVE_MODES.PREPEND);
          SaveToFileSync(
            SITE_SETTINGS_PATH,
            JSON.stringify(Object.assign(siteSettingsImport, { APP_VERSION: output.version })), // replace entire file with the same content, except with the  APP_VERSION property updated
            SAVE_MODES.WRITE
          );
          // updateJSONValue(SITE_SETTINGS_PATH, "APP_VERSION", output.version); // TODO: replace SITE_SETTINGS_PATH saveToFileSync above with this
        } else {
          log(chalk.bgCyan.black("  Release aborted  "));
        }
        return;
      });
    });
  });
});
