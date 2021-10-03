const chalk = require("chalk");
const log = console.log;
const { OMDB_PLOT_TYPES } = require("./lib/config");
const { saveToFile } = require("./lib/saveToFile");
const videos = require("./dataTest.json");
const { fetchVideosWithDelayAndFormat } = require("./lib/fetchVideosWithDelayAndFormat");
const { hasDuplicates, findDuplicates } = require("./lib/findDuplicates");
const { fetchSeriesData } = require("./lib/fetchSeries");

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
    log(`\n${chalk.bgGreen(res.message)}`);
    function errorCallback() {
      log(JSON.stringify(videos));
      log(chalk.bgRed("Failed to save. Dumping data into console above instead"));
    }

    saveToFile("./", "db.json", JSON.stringify(videos), false, errorCallback);

    //fetchSeriesData(videos, OMDB_PLOT_TYPES.full);
  })
  .catch((err) => {
    const videosThatDidntFail = videos.filter((x) => !x.__error);

    function errorCallback() {
      log(JSON.stringify(videosThatDidntFail));
      log(
        chalk.bgRed("Failed to save successful fetches. Dumping those into console above instead")
      );
    }

    log(`\n\n${chalk.bgRed(err.message)}`);
    listAllErroredFetches(videos);

    log(chalk.bgGreen("Saving the successful fetches"));
    // save all the ones that didn't fail
    saveToFile("./", "db.json", JSON.stringify(videosThatDidntFail), false, errorCallback);
  });

// TODO: handle fetching seriesData and then pushing them to the existing videos array, and then saving it
// TODO: handle fetching only the ones that failed and then pushing them to the existing videos array, and then saving it
