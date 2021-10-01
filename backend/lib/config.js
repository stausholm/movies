const {OMDB_API_KEY} =  require('../secrets')

const OMDB_API_BASEURL = 'https://www.omdbapi.com/?apikey=' + OMDB_API_KEY
const OMDB_PLOT_TYPES = {short: 'short', full: 'full'} 
const OMDB_VIDEO_TYPES = {movie: 'movie', series: 'series', episode: 'episode'}
const OMDB_API_EMPTY_VAL_RESPONSE = 'N/A'
const OMDB_POSTER_IMAGE_SIZES = {
  thumbnail: 100,
  medium: 300,
  large: 600
}

module.exports = {
  OMDB_API_BASEURL,
  OMDB_PLOT_TYPES,
  OMDB_VIDEO_TYPES,
  OMDB_API_EMPTY_VAL_RESPONSE,
  OMDB_POSTER_IMAGE_SIZES
}