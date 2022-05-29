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

  let rawData;
  try {
    rawData = fs.readFileSync(file);
  } catch (error) {
    rawData = Buffer.from("{}");
    log(`No such file exists at ${error.path}. Creating file.`);
  }

  const dataParsed = JSON.parse(rawData);

  // replace entire file with the same content, except with the [property] updated.
  // "null, 2" parameters is to make the outputted JSON human-readable
  const dataUpdated = JSON.stringify(Object.assign(dataParsed, { [property]: newValue }), null, 2);
  fs.writeFile(file, dataUpdated, (err) => {
    if (err) {
      log(chalk.bgRed(`Error saving to ${file}`));
      if (errorCallback) {
        errorCallback();
      }
      throw err;
    }
    log(chalk.green(`JSON saved to ${file}`));
    if (successCallback) {
      successCallback();
    }
  });
};

module.exports = {
  SaveToFileSync,
  SAVE_MODES,
  updateJSONValue,
};
