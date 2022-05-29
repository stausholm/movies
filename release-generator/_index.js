// trying out different ideas for a global cli tool
// npm run generate-release
const test = () => {
  console.log("PATH:     ", process.mainModule.path);
  console.log("CWD:      ", process.cwd());
  console.log("__DIRNAME:", __dirname);
  console.log("\n");
};

const [node_path, file_path, ...arguments] = process.argv;

const argumentsMapped = arguments.reduce((acc, curr) => {
  const [key, val] = curr.split("=");
  acc[key] = val;
  return acc;
}, {});

console.log(argumentsMapped); // e.g. run "node _index.js asd=123 qwe=321"
console.log(process.env.npm_config_asd); // e.g. run "node _index.js --asd=123"
test();

module.exports = {
  test,
};
