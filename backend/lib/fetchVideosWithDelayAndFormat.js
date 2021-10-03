const { formatVideoObj } = require("./format");
const { fetchVideoData } = require("./fetchContent");
const FETCH_INTERVAL_MS = 1000;
const chalk = require("chalk");
const log = console.log;

function updateVideoObj(videos, videoId, newVal) {
  const videoIndex = videos.findIndex((vid) => vid.imdbId === videoId);
  if (videoIndex >= 0) {
    videos[videoIndex] = newVal;
  } else {
    throw new Error(`Failed to update video: No video found with id ${videoId}`);
  }
}

async function fetchVideosWithDelayAndFormat(videosArr, plotType) {
  let videoIndex = 0;
  let videos = videosArr;

  return await new Promise((resolve, reject) => {
    // INFO: using setInterval and videoIndex iterator instead of promise.all due to omdb api rate limit, and don't want each apicall to wait for the previous to finish
    let intervalFunc = setInterval(() => {
      if (videoIndex >= videos.length) {
        // looped through all videos. Stop the loop
        clearInterval(intervalFunc);

        if (videos.find((x) => x.__error)) {
          reject("Done fetching videos, but some returned with errors!");
        } else {
          resolve("Done fetching all videos succesfully");
        }
      } else {
        const currentVideoIndex = videoIndex;

        log("fetching", videos[currentVideoIndex].imdbId);
        fetchVideoData(videos[currentVideoIndex].imdbId, plotType)
          .then((data) => {
            const formattedVideoObj = formatVideoObj(videos[currentVideoIndex], data);
            updateVideoObj(videos, videos[currentVideoIndex].imdbId, formattedVideoObj);
          })
          .catch((err) => {
            log(chalk.bgRed("fetch failed:", err));
            videos[currentVideoIndex].__error = true;
          })
          .finally(() => {
            videos[currentVideoIndex].__finished = true;
          });

        videoIndex++;
      }
    }, FETCH_INTERVAL_MS);
  });
}

module.exports = {
  fetchVideosWithDelayAndFormat,
};
