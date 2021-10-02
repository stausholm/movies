const chalk = require('chalk')
const log = console.log
const {fetchVideoData} = require('./lib/fetch')
const {OMDB_PLOT_TYPES} = require('./lib/config')
const FETCH_INTERVAL_MS = 1000
const {saveToFile} = require('./lib/saveToFile')
const {formatVideoObj} = require('./lib/format')

fetchVideoData('tt0606111', 'short')
  .then(data => {
    //console.log(data)
    const formattedVideoObj = formatVideoObj({
      "title": "Purple Giraffe",
      "subtitles": "[None]",
      "languages": "[English]",
      "imdbId": "tt0606111"
    }, data)

    saveToFile('./','db.json',JSON.stringify(formattedVideoObj))
  })
  .catch(err => {
    log(chalk.bgRed(err))
  })