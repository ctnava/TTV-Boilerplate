const path = require("path");
const mode = process.argv.mode;
const configAddons = require("./webpack/input");
const { entry, plugins } = configAddons(mode);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { optimization, ruleSet, resolve } = require("./webpack/settings");
const rules = (mode === "production") ? ruleSet(MiniCssExtractPlugin.loader) : ruleSet("style-loader");

var config = { 
  entry, 
  plugins, 

  optimization,  
  resolve,
  module: { rules },

  output: { 
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist") 
  }
};


module.exports = () => {
  if (mode === "production") {
    config.plugins.push(new MiniCssExtractPlugin());
    const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    config.optimization.splitChunks={
      cacheGroups:{
        default:false,
        vendors:false,
        vendor:{
          chunks:'all',
          test:/node_modules/,
          name:false
        }
      },
      name:false
    };
  } else {
    const isDevrig = (mode === "devrig");
    config.devServer = {
      contentBase: path.join(__dirname,'public'),
      host: isDevrig ? 'localhost.rig.twitch.tv' : 'localhost',
      headers: {'Access-Control-Allow-Origin': '*'},
      port: 8080,
      https: isDevrig
    };
  }
  
  return config;
};
