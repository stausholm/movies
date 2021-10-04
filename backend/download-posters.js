const { imageFolderPathExists, fetchAndSaveVideoPosters } = require("./lib/downloadPosterForVideo");
const chalk = require("chalk");
const log = console.log;

const DB = require("./dbTest.json"); // change this to pull poster data from another file

function downloadAllPosters(videos, index = 0) {
  fetchAndSaveVideoPosters(videos[index])
    .then((res) => {
      log(res);
    })
    .catch((err) => {
      log(chalk.bgRed(err));
    })
    .finally(() => {
      log(`(${i + 1}/${videos.length})`);
      if (index + 1 === videos.length) {
        log(chalk.bgGreen("all done!"));
      } else {
        downloadAllPosters(videos, ++index);
      }
    });
}

if (imageFolderPathExists()) {
  // Not sure if there's a rate limit, but requesting ~1200 images from a free api at once seems like it would be frowned upon
  // So imma just request them one after the other
  const videos = DB;
  downloadAllPosters(videos);
}
