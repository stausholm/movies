const findDuplicates = (arr) => {
  return arr.filter((e, i, a) => a.indexOf(e) !== i);
};

const findUnique = (arr) => {
  return arr.filter((e, i, a) => a.indexOf(e) === i);
};

const hasDuplicates = (arr) => {
  return !arr.every((e, i, a) => a.indexOf(e) === i);
};

module.exports = {
  findDuplicates,
  findUnique,
  hasDuplicates,
};
