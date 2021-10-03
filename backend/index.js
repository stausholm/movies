const chalk = require("chalk");
const log = console.log;
const { fetchVideoData } = require("./lib/fetchContent");
const { OMDB_PLOT_TYPES } = require("./lib/config");
const { saveToFile } = require("./lib/saveToFile");
const { formatVideoObj } = require("./lib/format");
const videos = require("./dataTest.json");
const { fetchVideosWithDelayAndFormat } = require("./lib/fetchVideosWithDelayAndFormat");
const { hasDuplicates, findDuplicates } = require("./lib/findDuplicates");

if (hasDuplicates(videos.map((x) => x.imdbId))) {
  return log(
    chalk.bgRed(
      "Duplicate imdbIds found in dataset. Please remove these before continuing:",
      findDuplicates(videos.map((x) => x.imdbId))
    )
  );
}

function listAllErroredFetches() {
  log(chalk.bgRed("The following entries failed to retrieve omdb data:"));
  console.table(videos.filter((x) => x.__error));
}

fetchVideosWithDelayAndFormat(videos, OMDB_PLOT_TYPES.full)
  .then((res) => {
    log(`\n${chalk.bgGreen(res)}`);
    function errorCallback() {
      log(JSON.stringify(videos));
      log(chalk.bgRed("Failed to save. Dumping data into console above"));
    }

    saveToFile("./", "db.json", JSON.stringify(videos), false, errorCallback);
  })
  .catch((err) => {
    log(`\n\n${chalk.bgRed(err)}`);
    listAllErroredFetches(videos);
  });
