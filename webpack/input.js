const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");


const entryPoints = [
  {
    name:"VideoComponent",
    path:"./src/VideoComponent.js",
    outputHtml:"video_component.html",
    build:true
  },{
    name:"VideoOverlay",
    path:"./src/VideoOverlay.js",
    outputHtml:"video_overlay.html",
    build:true
  },{
    name:"Panel",
    path:"./src/Panel.js",
    outputHtml:"panel.html",
    build:true
  },{
    name:"Config",
    path:"./src/Config.js",
    outputHtml:"config.html",
    build:true
  },{
    name:"LiveConfig",
    path:"./src/LiveConfig.js",
    outputHtml:"live_config.html",
    build:true
  },{
    name:"Mobile",
    path:"./src/Mobile.js",
    outputHtml:"mobile.html",
    build:true
  }
]


const configAddons = (mode) => {
  var entry = {};
  var plugins = [
    new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['dist']}),
    new webpack.HotModuleReplacementPlugin()
  ];


  for (const point in entryPoints) {
    if (point.build) {
      entry.name = `./src/${point.name}.js`;
      if(mode === 'production') {
        const options = {
          inject:true,
          chunks: point.name,
          template:'./webpack/template.html',
          filename: point.outputHtml
        };
        plugins.push(new HtmlWebpackPlugin(options));
      }
    }
  }

  return { entry, plugins };
}


module.exports = configAddons;