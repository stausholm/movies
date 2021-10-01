const chalk = require('chalk')
const log = console.log
const {fetchVideoData} = require('./lib/fetch')
const {OMDB_PLOT_TYPES} = require('./lib/config')
const FETCH_INTERVAL_MS = 1000


fetchVideoData('tt0606111', 'short')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    log(chalk.bgRed(err))
  })