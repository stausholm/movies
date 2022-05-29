#!/usr/bin/env node

const log = console.log;
const chalk = require("chalk");
const { getReleaseAnswers } = require("./resources/releaseQuestions");
const { getChangelogAnswers } = require("./resources/changelogQuestions");
const { getSummaryAnswers } = require("./resources/summaryQuestions");
const { SaveToFileSync, SAVE_MODES, updateJSONValue } = require("./resources/saveToFile");
const { getOutputAnswers, concatenateOutputToMarkdown } = require("./resources/outputQuestions");

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
  // log(JSON.stringify(releaseAnswers, null, "  "));
  getChangelogAnswers().then((changelogAnswers) => {
    getSummaryAnswers().then((summaryAnswers) => {
      const output = {
        version: releaseAnswers.releaseType.version,
        releaseType: releaseAnswers.releaseType.type,
        releaseDate: releaseAnswers.releaseDate,
        changes: changelogAnswers,
        summary: summaryAnswers.summary || null,
        releaseNotesMarkdownString: null,
      };
      output.releaseNotesMarkdownString = concatenateOutputToMarkdown(output);

      getOutputAnswers(output).then((confirmAnswer) => {
        if (confirmAnswer.confirmRelease) {
          log(chalk.bgGreen(`  Updating files to release ${output.version}:  `));
          SaveToFileSync(RELEASE_LOG_PATH, JSON.stringify(output), SAVE_MODES.WRITE);
          SaveToFileSync(CHANGELOG_PATH, output.releaseNotesMarkdownString, SAVE_MODES.PREPEND);
          updateJSONValue(SITE_SETTINGS_PATH, "APP_VERSION", output.version);
        } else {
          log(chalk.bgCyan.black("  Release aborted  "));
        }
        return; // TODO: why doesn't the node process close if a summary has been added to the release?
        /* 
a
summary


lorem ipsum dolor sit amet lorem ipsum


### a heading
> a quote

"something in quotation marks"
*something in asterixes*
[special chars](https://google.com)

```
block code
```

text `inline code` more text

1. list
2. more list

bla bla bla
        */
      });
    });
  });
});
