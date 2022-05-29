# Release generator

run the index.js file to generate a release. `node index.js`

Answer a series of questions related to the release.
After answering the questions, the following files will be updated based on the answers to the questions:

## ./release.json:
the raw json output for the most recently generated release. Not currently used for anything. This file is overwritten everytime a release is generated.

## ../frontend/movies-frontend/src/changelog/changelog.md:
The changelog shown in the frontend. Based on the answers provided, releasenotes in markdown format will be generated, and prepended to the top of changelog.md

## ../frontend/movies-frontend/src/constants/SiteSettings.json:
The APP_VERSION property in siteSettings.json will be bumped, based on the answers provided.