const fs = require("fs");
const { rules, resolve, optimization } = require("./webpack/input");
const server = require("./webpack/server");
const generate = require("./webpack/generate");


const falsyVals = ["", undefined, false, null];
const pathToApiEnv = "./api/env.json";
module.exports = (env, argv) => {
  const mode = argv.mode;
  const devrig = (!falsyVals.includes(env.devrig));
  fs.writeFileSync(pathToApiEnv, JSON.stringify({mode,devrig}, null, 2)); 

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
  
  // if (argv.mode === "production") {
  //   config.optimization.splitChunks = {
  //     name: false,
  //     cacheGroups: {
  //       default:false,
  //       vendors:false,
  //       vendor: {
  //         chunks:'all',
  //         test:/[\\/]node_modules[\\/]/,
  //         name:false
  //       }
  //     }
  //   }
  // }
  if (mode === "development") {config.devServer = server(__dirname, devrig)}
  return config;
};
