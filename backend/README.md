# Movies backend

backend consists of a node script that you run in the console.
This script will retrieve data from omdb, for each object found in data.json, and save this data in db.json.
If an object in data.json is an episode of something, the script will also go out and find the series that this episode is from, and include the series in db.json.

If an object in data.json should produce a failed response from omdb, that object will be marked with `__error=true`. 
After all fetches are done, any object marked with `__error=true` will not be included in the saved data in db.json, but instead be added to data-failed.json, for manual handling afterwards.

dataTest.json is a small subset of data, used for testing, instead of using the entire dataset and spending unnecesary api calls.

Api calls are spread out using setInterval, as to not hit a ratelimit that the omdb api has.

If the data in db.json should use the short plot instead of a full plot, change the script in index.js to use `OMDB_PLOT_TYPES.short` instead of `OMDB_PLOT_TYPES.full`

## Start
1. run `npm run start`
2. wait for script to finish fetching and saving

## Test validity of data
1. run `npm run verify-data`
2. manually fix any potential errors found in the dataset from step 1

## OMDB api examples
- Searching for titles + pagination: http://www.omdbapi.com/?s=Batman&page=1&apikey=aaa
- Searching for seasons: http://www.omdbapi.com/?i=tt0944947&Season=1&apikey=aaa
  - If you have a lot of seasons of a series, and don't want to enter all of the episodes manually in data.json, you can fint the series imdbId on imdb.com and use that with this omdb endpoint. Then running this in the browser console (replacing 'subtitles' and 'languages' with correct values) and copying the result into data.json
  `json.Episodes.map(x => {return {"title": x.Title, "subtitles": "[None]","languages": "[English]", "imdbId": x.imdbID}})`
- Series: https://www.omdbapi.com/?i=tt0460649&apikey=aaa
- Movie: https://www.omdbapi.com/?i=tt3896198&plot=full&apikey=aaa
- Episode: https://www.omdbapi.com/?i=tt0606111&apikey=aaa
- Movie with many empty property values: https://www.omdbapi.com/?i=tt7798632&plot=full&apikey=aaa