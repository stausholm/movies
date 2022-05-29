const RELEASE_TYPES = {
  MAJOR: "MAJOR",
  MINOR: "MINOR",
  PATCH: "PATCH",
};

const CHANGE_TYPES = {
  ADDED: "added",
  CHANGED: "changed",
  DEPRECATED: "deprecated",
  REMOVED: "removed",
  FIXED: "fixed",
  SECURITY: "security",
};

const TODAY = new Date().toISOString().substring(0, 10);

module.exports = {
  RELEASE_TYPES,
  CHANGE_TYPES,
  TODAY,
};
