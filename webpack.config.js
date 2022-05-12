const { rules, resolve, optimization } = require("./webpack/input");
const server = require("./webpack/server");
const generate = require("./webpack/generate");

module.exports = (env, argv) => {
  const { entry, plugins } = generate.inputs(argv.mode);
  const output = generate.outputs(__dirname);
  const devrig = (env.devrig === true);

  var config = {
    module: {rules},
    entry,
    plugins, 
    output,  
    resolve,
    optimization
  }
  
  if (argv.mode === "production") {
    config.optimization.splitChunks = {
      name: false,
      cacheGroups: {
        default:false,
        vendors:false,
        vendor: {
          chunks:'all',
          test:/node_modules/,
          name:false
        }
      }
    }
  } else {config.devServer = server(__dirname, devrig)}

  return config;
};
