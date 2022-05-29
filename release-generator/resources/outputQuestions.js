const chalk = require("chalk");
const inquirer = require("inquirer");

const writeChangeToMarkdown = (output, changeType, changeTypeLabel) => {
  if (output.changes[changeType]) {
    const list = output.changes[changeType].map((x) => `- ${x}`).join("\n");
    const label = "### " + changeTypeLabel + "\n";
    return label + list + "\n";
  }
  return "";
};

const writeChangeToConsole = (output, changeType, changeTypeLabel) => {
  if (output.changes[changeType]) {
    const list = output.changes[changeType].map((x) => `${chalk.blue("-")} ${x}`).join("\n");
    const label = chalk.blue("### " + changeTypeLabel) + "\n";
    return label + list + "\n";
  }
  return "";
};

const concatenateOutputToMarkdown = (output) => {
  return (
    `## [${output.version}] *${output.releaseDate}* \n` +
    `${output.summary ? output.summary + "\n\n" : "\n"}` +
    `${output.changes.added ? writeChangeToMarkdown(output, "added", "Added") + "\n" : ""}` +
    `${output.changes.changed ? writeChangeToMarkdown(output, "changed", "Changed") + "\n" : ""}` +
    `${output.changes.deprecated ? writeChangeToMarkdown(output, "deprecated", "Deprecated") + "\n" : ""}` +
    `${output.changes.removed ? writeChangeToMarkdown(output, "removed", "Removed") + "\n" : ""}` +
    `${output.changes.fixed ? writeChangeToMarkdown(output, "fixed", "Fixed") + "\n" : ""}` +
    `${output.changes.security ? writeChangeToMarkdown(output, "security", "Security") + "\n" : ""}`
  );
};

const getOutputAnswers = (output) => {
  const confirmQuestion = {
    type: "confirm",
    name: "confirmRelease",
    message:
      chalk.bold(`Confirm release ${output.version}? \n`) +
      chalk.bgGreen("                          RELEASE NOTES                          \n\n") +
      chalk.blue(`## [${chalk.yellow(output.version)}] *${chalk.italic(output.releaseDate)}* \n`) +
      `${output.summary ? output.summary + "\n\n" : "\n"}` +
      `${output.changes.added ? writeChangeToConsole(output, "added", "Added") + "\n" : ""}` +
      `${output.changes.changed ? writeChangeToConsole(output, "changed", "Changed") + "\n" : ""}` +
      `${output.changes.deprecated ? writeChangeToConsole(output, "deprecated", "Deprecated") + "\n" : ""}` +
      `${output.changes.removed ? writeChangeToConsole(output, "removed", "Removed") + "\n" : ""}` +
      `${output.changes.fixed ? writeChangeToConsole(output, "fixed", "Fixed") + "\n" : ""}` +
      `${output.changes.security ? writeChangeToConsole(output, "security", "Security") + "\n" : ""}` +
      chalk.bgGreen("                                                                 \n") +
      chalk.bold(`Confirm release ${output.version}?`),
  };

  return inquirer.prompt(confirmQuestion);
};

module.exports = {
  getOutputAnswers,
  concatenateOutputToMarkdown,
};
