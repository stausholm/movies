const chalk = require("chalk");
const log = console.log;
const { OMDB_VIDEO_TYPES } = require("./lib/config");
const { hasEpisodes } = require("./lib/fetchSeries");
const { hasDuplicates, findDuplicates } = require("./lib/findDuplicates");

const videos = require("./data.json"); // Change this to pull unfetched videos from another file
const DB = require("./db.json"); // Change this to pull fetched videos from another file

let hasErrors = false;

if (hasDuplicates(videos.map((x) => x.imdbId))) {
  log(
    chalk.bgRed(
      "Duplicate imdbId(s) found in dataset. Please remove these before continuing:",
      findDuplicates(videos.map((x) => x.imdbId))
    )
  );
  hasErrors = true;
  log("\n");
}

if (hasDuplicates(DB.map((x) => x.imdbId))) {
  log(chalk.bgRed("Duplicate imdbId(s) found in db!", findDuplicates(DB.map((x) => x.imdbId))));
  hasErrors = true;
  log("\n");
}

if (!DB.every((x) => x.__formatted)) {
  log(
    chalk.bgRed(
      "Found unformatted video(s) in db!",
      DB.filter((x) => !x.__formatted)
    )
  );
  hasErrors = true;
  log("\n");
}

if (!DB.every((x) => !x.__error)) {
  log(
    chalk.bgRed(
      "Found video(s) with errors in db!",
      DB.filter((x) => x.__error)
    )
  );
  hasErrors = true;
  log("\n");
}

if (hasEpisodes(DB)) {
  const uniqueSeriesIds = [
    ...new Set(DB.filter((video) => video.seriesId).map((video) => video.seriesId)),
  ];
  const series = DB.filter((video) => video.type === OMDB_VIDEO_TYPES.series).map(
    (video) => video.imdbId
  );

  const difference = uniqueSeriesIds.filter((x) => series.indexOf(x) === -1);

  if (difference.length > 0) {
    log(
      chalk.bgRed(
        "Some episode(s) don't have a corresponding type='series' object where the series' imdbId property matches the episode's 'seriedId' property!",
        difference
      )
    );
    hasErrors = true;
    log("\n");
  }
}

if (!hasErrors) {
  log(chalk.bgGreen("dataset and db looks good"));
}
