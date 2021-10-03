const {
  OMDB_API_EMPTY_VAL_RESPONSE,
  OMDB_POSTER_IMAGE_SIZES,
  OMDB_VIDEO_TYPES,
} = require("./config");

function resizePosterUrl(posterUrl, size) {
  return posterUrl.replace(/_SX([0-9]+)/, `_SX${size}`);
}

function formatVideoObj(originalObj, responseData) {
  let formattedObj = {
    title: originalObj.title || responseData.Title,
    subtitles: originalObj.subtitles || OMDB_API_EMPTY_VAL_RESPONSE,
    languages: originalObj.languages || OMDB_API_EMPTY_VAL_RESPONSE,
    imdbId: responseData.imdbID,
    imdbTitle: responseData.Title,
    year: responseData.Year,
    releaseYear: parseInt(responseData.Year.substring(0, 4)), // in case of series where their year is e.g. "2005-2014",
    rated: responseData.Rated,
    released: responseData.Released,
    runtimeMinutes: parseInt(responseData.Runtime),
    genres: responseData.Genre.split(","),
    director: responseData.Director.split(","),
    writer: responseData.Writer.split(","),
    actors: responseData.Actors.split(","),
    plot: responseData.Plot,
    country: responseData.Country,
    awards: responseData.Awards,
    posterUrl:
      responseData.Poster && responseData.Poster !== OMDB_API_EMPTY_VAL_RESPONSE
        ? {
            thumbnail: resizePosterUrl(responseData.Poster, OMDB_POSTER_IMAGE_SIZES.thumbnail),
            medium: resizePosterUrl(responseData.Poster, OMDB_POSTER_IMAGE_SIZES.medium),
            large: resizePosterUrl(responseData.Poster, OMDB_POSTER_IMAGE_SIZES.large),
          }
        : null,
    ratings: responseData.Ratings.map((rating) => {
      return {
        source: rating.Source,
        value: rating.Value,
      };
    }),
    metascore: responseData.Metascore,
    imdbRating: responseData.imdbRating,
    imdbVotes: responseData.imdbVotes,
    type: responseData.Type,
    imdbUrl: `https://www.imdb.com/title/${responseData.imdbID}`,
  };

  switch (formattedObj.type) {
    case OMDB_VIDEO_TYPES.movie:
      formattedObj.DVD = responseData.DVD;
      formattedObj.boxOffice = responseData.BoxOffice;
      formattedObj.production = responseData.Production;
      formattedObj.website = responseData.Website;
      break;
    case OMDB_VIDEO_TYPES.series:
      formattedObj.totalSeasons = parseInt(responseData.totalSeasons);
      break;
    case OMDB_VIDEO_TYPES.episode:
      (formattedObj.seriesId = responseData.seriesID),
        (formattedObj.season = parseInt(responseData.Season));
      formattedObj.episode = parseInt(responseData.Episode);
      break;
    default:
      break;
  }

  return formattedObj;
}

module.exports = {
  formatVideoObj,
};
