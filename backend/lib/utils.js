function varToString(varObj) {
  return Object.keys(varObj)[0];
}

function addTrailingSlashIfMissing(path) {
  return path.substr(-1) === "/" ? path : path + "/";
}

function getUrlExtension(url) {
  return url.split(/[#?]/)[0].split(".").pop().trim();
}

module.exports = {
  varToString,
  addTrailingSlashIfMissing,
  getUrlExtension,
};
