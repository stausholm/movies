const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const log = console.log;

function saveToFile(
  relativeFilePath,
  fileName,
  data,
  appendDataToFile = false,
  errorCallback,
  savedCallback
) {
  fs.open(
    path.join(__dirname, "../", relativeFilePath, fileName),
    appendDataToFile ? "a" : "w",
    (e, id) => {
      if (e) {
        log(chalk.bgRed("Error opening file", e));
        if (errorCallback) {
          errorCallback();
        }
        return;
      }
      fs.write(id, data, null, "utf-8", () => {
        fs.close(id, () => {
          console.log(chalk.green(`data saved to ${relativeFilePath + fileName}`));
          if (savedCallback) {
            savedCallback();
          }
        });
      });
    }
  );
}

module.exports = {
  saveToFile,
};
