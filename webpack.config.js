const { rules, resolve, optimization } = require("./webpack/input");
const server = require("./webpack/server");
const generate = require("./webpack/generate");


const falsyVals = ["", undefined, false, null];
module.exports = (env, argv) => {
  
  const mode = argv.mode;
  const devrig = (!falsyVals.includes(env.devrig));

  const { entry, plugins } = generate.inputs(mode);
  const output = generate.outputs(__dirname);

  var config = {
    module: {rules},
    entry,
    plugins, 
    output,  
    resolve,
    optimization
  }
  if (mode === "development") {config.devServer = server(__dirname, devrig)}
  return config;
};
