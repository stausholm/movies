const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const log = console.log;

const SAVE_MODES = {
  APPEND: "append",
  PREPEND: "prepend",
  WRITE: "write",
};

const SaveToFileSync = (relativeFilePath, newData, saveMode, errorCallback, successCallback) => {
  const file = path.join(__dirname, "../", relativeFilePath);
  let data;
  try {
    data = fs.readFileSync(file);
  } catch (error) {
    data = Buffer.from("");
    log(`No such file exists at ${error.path}. Creating file.`);
  }
  const fd = fs.openSync(file, "w+");
  const insert = Buffer.from(newData);

  switch (saveMode) {
    case SAVE_MODES.APPEND:
      fs.writeSync(fd, data, 0, data.length, 0);
      fs.writeSync(fd, insert, 0, insert.length, data.length);
      break;
    case SAVE_MODES.PREPEND:
      fs.writeSync(fd, insert, 0, insert.length, 0);
      fs.writeSync(fd, data, 0, data.length, insert.length);
      break;
    case SAVE_MODES.WRITE:
    default:
      fs.writeSync(fd, insert, 0, insert.length, 0);
      break;
  }

  fs.close(fd, (err) => {
    if (err) {
      log(chalk.bgRed(`Error saving to ${file}`));
      if (errorCallback) {
        errorCallback();
      }
      throw err;
    }
    log(chalk.green(`data saved to ${file}`));
    if (successCallback) {
      successCallback();
    }
  });
};

const updateJSONValue = (relativeFilePath, property, newValue, errorCallback, successCallback) => {
  const file = path.join(__dirname, "../", relativeFilePath);
  // TODO
};

module.exports = {
  SaveToFileSync,
  SAVE_MODES,
  updateJSONValue,
};
