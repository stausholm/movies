const chalk = require("chalk");
const log = console.log;
const videos = require("./dataTest.json");
const db = require("./db.json");
const { hasDuplicates, findDuplicates } = require("./lib/findDuplicates");

let hasErrors = false;

if (hasDuplicates(videos.map((x) => x.imdbId))) {
  log(
    chalk.bgRed(
      "Duplicate imdbIds found in dataset. Please remove these before continuing:",
      findDuplicates(videos.map((x) => x.imdbId))
    )
  );
  hasErrors = true;
}

log("\n");

if (hasDuplicates(db.map((x) => x.imdbId))) {
  log(chalk.bgRed("Duplicate imdbIds found in db!", findDuplicates(db.map((x) => x.imdbId))));
  hasErrors = true;
}

log("\n");

if (!db.every((x) => x.__finished)) {
  log(
    chalk.bgRed(
      "Found unfished videos in db!",
      db.filter((x) => !x.__finished) // TODO: series don't get the __finished flag
    )
  );
  hasErrors = true;
}

log("\n");

if (!db.every((x) => !x.__error)) {
  log(
    chalk.bgRed(
      "Found videos with errors in db!",
      db.filter((x) => x.__error)
    )
  );
  hasErrors = true;
}

// TODO: test if all objects with type "episode", has a corresponding "series" object that matches the episode's "seriesId"

if (!hasErrors) {
  log(chalk.bgGreen("dataset and db looks good"));
}
