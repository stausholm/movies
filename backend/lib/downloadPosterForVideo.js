const fs = require("fs");
const fetch = require("node-fetch");
const { OMDB_POSTER_IMAGE_SIZES } = require("./config");
const IMAGE_FOLDER = "./images/";
const { varToString, addTrailingSlashIfMissing, getUrlExtension } = require("./utils");
const chalk = require("chalk");
const log = console.log;

async function fetchAndSaveVideoPosters(video) {
  return await new Promise((resolve, reject) => {
    if (video.posterUrl) {
      let finishedCount = 0;
      let erroredCount = 0;
      Object.keys(video.posterUrl).forEach((key, i, arr) => {
        const url = video.posterUrl[key];
        fetch(url)
          .then((res) => {
            if (!res.ok) {
              const message = `${key} poster for ${video.imdbId} failed to fetch with statuscode: ${res.status}`;
              throw new Error(message);
            }
            const sizeX = OMDB_POSTER_IMAGE_SIZES[key];
            //log(`Fetching ${key} poster for ${video.imdbId}`);
            const fileName = `${video.imdbId}_SX${sizeX}.${getUrlExtension(url)}`;
            const dest = fs.createWriteStream(addTrailingSlashIfMissing(IMAGE_FOLDER) + fileName);
            res.body.pipe(dest);

            dest.on("close", () => {
              //log(`DONE Fetching ${key} poster for ${video.imdbId}`);
              finishedCount += 1;
              if (finishedCount + erroredCount === arr.length) {
                if (erroredCount > 0) {
                  reject(`${video.imdbId}: Saved:${finishedCount}. Failed:${erroredCount}`);
                } else {
                  resolve(`All posters saved for ${video.imdbId}`);
                }
              }
            });
          })
          .catch((err) => {
            log(chalk.bgRed(err));
            erroredCount += 1;
            if (finishedCount + erroredCount === arr.length) {
              reject(`${video.imdbId}: Saved:${finishedCount}. Failed:${erroredCount}`);
            }
          });
      });
    } else {
      //log(`${video.imdbId} has no posterUrl`);
      resolve(`Skipping ${video.imdbId}: No posterUrl exists on object`);
    }
  });
}

function imageFolderPathExists() {
  if (fs.existsSync(IMAGE_FOLDER)) {
    return true;
  } else {
    log(
      chalk.bgRed(
        `The ${varToString({
          IMAGE_FOLDER,
        })}="${IMAGE_FOLDER}" path does not exist. Please create this folder before continuing, or point the ${varToString(
          { IMAGE_FOLDER }
        )} variable to another folder`
      )
    );
    return false;
  }
}

module.exports = {
  fetchAndSaveVideoPosters,
  imageFolderPathExists,
};
