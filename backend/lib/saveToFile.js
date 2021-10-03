const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const log = console.log;

function saveToFile(relativeFilePath, fileName, data, appendDataToFile = false) {
  fs.open(
    path.join(__dirname, "../", relativeFilePath, fileName),
    appendDataToFile ? "a" : "w",
    (e, id) => {
      if (e) {
        return log(chalk.bgRed("Error opening file", e));
      }
      fs.write(id, data, null, "utf-8", () => {
        fs.close(id, () => {
          console.log(chalk.green(`data saved to ${relativeFilePath + fileName}`));
        });
      });
    }
  );
}

module.exports = {
  saveToFile,
};
