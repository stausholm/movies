const chalk = require("chalk");
const log = console.log;
const { OMDB_PLOT_TYPES, OMDB_VIDEO_TYPES } = require("./lib/config");
const { saveToFile } = require("./lib/saveToFile");
const { fetchVideosWithDelayAndFormat } = require("./lib/fetchVideosWithDelayAndFormat");
const { hasDuplicates, findDuplicates } = require("./lib/findDuplicates");
const { fetchSeriesData, formatSeriesData, hasEpisodes } = require("./lib/fetchSeries");

const videos = require("./data.json"); // Change this to pull videos from another file
const DB = "db.json"; // change this to save videos to another file

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

    saveToFile(
      "./",
      DB,
      JSON.stringify(videos),
      false,
      () => {
        log(JSON.stringify(videos));
        log(chalk.bgRed("Failed to save. Dumping data into console above instead"));
      },
      () => {
        if (hasEpisodes(videos)) {
          // wait to fetch series data until after writing videos to file
          fetchSeriesData(videos, OMDB_PLOT_TYPES.full)
            .then((series) => {
              const seriesFormatted = formatSeriesData(series);

              saveToFile("./", DB, JSON.stringify([...videos, ...seriesFormatted]), false, () => {
                log(JSON.stringify(seriesFormatted));
                log(chalk.bgRed("Failed to save series. Dumping data into console above instead"));
              });
            })
            .catch((err) => {
              log(chalk.bgRed("something went wrong while fetching all series"));
              log(err);
            });
        }

        log(chalk.bgBlackBright("Remember to verify dataset with 'npm run verify-data'"));
      }
    );

    // clear data-failed.json from any old failed fetches
    saveToFile("./", "data-failed.json", JSON.stringify([]), false, () => {
      log(chalk.bgRed("Failed to clean data-failed.json"));
    });
  })
  .catch((err) => {
    const videosThatDidntFail = videos.filter((x) => !x.__error);
    const videosThatFailed = videos.filter((x) => x.__error);

    log(`\n\n${chalk.bgRed(err.message)}`);
    log(chalk.bgRed(`${videosThatFailed.length}/${videos.length} entries threw an error`));
    listAllErroredFetches(videos);

    log(`Saving the successful fetches to ${DB}`);
    // save all the ones that didn't fail
    saveToFile("./", DB, JSON.stringify(videosThatDidntFail), false, () => {
      log(JSON.stringify(videosThatDidntFail));
      log(chalk.bgRed("Failed to save successful fetches. Dumping those above instead"));
    });

    log("Saving the failed fetches to data-failed.json");
    // save all the ones failed
    saveToFile("./", "data-failed.json", JSON.stringify(videosThatFailed), false, () => {
      log(JSON.stringify(videosThatFailed));
      log(chalk.bgRed("Failed to save failed fetches. Dumping those above instead"));
    });
  });

// TODO: handle fetching only the ones that failed and then pushing them to the existing videos array, and then saving it
