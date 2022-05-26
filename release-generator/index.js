#!/usr/bin/env node

const log = console.log;
const inquirer = require("inquirer");
const chalk = require("chalk");
const { getReleaseAnswers, getNextSemanticVersion } = require("./resources/releaseQuestions");
const { getChangelogAnswers } = require("./resources/changelogQuestions");
const { getSummaryAnswers } = require("./resources/summaryQuestions");

// FILES TO WRITE TO:
const siteSettings = require("../frontend/movies-frontend/src/constants/SiteSettings.json");
const changelog = "../frontend/movies-frontend/src/changelog/changelog.md";
const output = "./release.json";
const currentVersion = siteSettings.APP_VERSION;

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
          // TODO: write to files
          log(chalk.bgGreen("  Files updated:  "));
          log("c/git/folder/changelog.md");
          log("c/git/folder/siteSettings.json");
          log("c/git/folder/releaseOutput.json");
        } else {
          log(chalk.bgCyan.black("  Release aborted  "));
        }
      });
    });
  });
});
