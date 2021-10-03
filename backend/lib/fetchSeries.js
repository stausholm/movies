const { formatVideoObj } = require("./format");
const { fetchVideoData } = require("./fetchContent");
const chalk = require("chalk");
const log = console.log;

/**
 * NOTE:
 * since there's only very few series in the dataset,
 * we don't risk running into the omdb rate limit, and it's not a big deal
 * to not save the ones that did succeed if only some of them succeeded.
 * So we can use promise.all here instead of setInterval, which we do in fetchVideosWithDelayAndFormat
 */
async function fetchSeriesData(videos, plotType) {
  log("fetching series data");
  // Find all episodes that have a "seriesId" property, and fetch data for that id
  const uniqueSeriesIds = [
    ...new Set(videos.filter((video) => video.seriesId).map((video) => video.seriesId)),
  ];

  let seriesFetchArr = [];

  uniqueSeriesIds.forEach((id) => {
    seriesFetchArr.push(fetchVideoData(id, plotType));
  });

  let seriesValues = await Promise.all(seriesFetchArr);

  return seriesValues;
}

function formatSeriesData(videos) {
  let seriesFormatted = [];

  videos.forEach((video) => {
    seriesFormatted.push(formatVideoObj({}, video));
  });

  return seriesFormatted;
}

function hasEpisodes(videos) {
  return videos.findIndex((x) => x.seriesId) !== -1;
}

module.exports = {
  fetchSeriesData,
  formatSeriesData,
  hasEpisodes,
};
