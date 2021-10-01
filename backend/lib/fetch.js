const fetch = require('node-fetch')
const {OMDB_API_BASEURL} = require('./config')


async function fetchVideoData(imdbId, plotType) {
  const urlParams = `&i=${imdbId}&plot=${plotType}`
  const response = await fetch(OMDB_API_BASEURL + urlParams)

  if (!response.ok) {
    const message = `An error has occured for id=${imdbId}: ${response.status}`
    throw new Error(message)
  }

  const data = await response.json()

  if(data.Response === "False") {
    const message = `An error has occured for id=${imdbId}: ${data.Error}`
    throw new Error(message)
  }

  return data
}

module.exports = {
  fetchVideoData
}