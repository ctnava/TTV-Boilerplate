const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");


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


module.exports = () => {

  var entry = {};
  var plugins = [
    new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['dist']}),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
    new WorkboxWebpackPlugin.GenerateSW()
  ];

  entryPoints.forEach((point) => {
    if (point.build) {
      entry.name = `./src/${point.name}.js`;
      const options = {
        inject:true,
        chunks: point.name,
        template:'./template.html',
        filename: point.outputHtml
      };
      plugins.push(new HtmlWebpackPlugin(options));
      console.log(options);
    }
  });


  const optimization = { 
    minimize:false,
    cacheGroups: {
      default:false,
      vendors:false,
      vendor:{
        chunks:'all',
        test:/node_modules/,
        name:false
      },
      name:false
    }
  };

  const rules = [
    {
      test: /\.(js|jsx)$/i,
      // exclude: /(node_modules|bower_components)/,
      loader: "babel-loader"
    },{
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    },{
      test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      type: "asset",
      loader: "file-loader", 
      options:{name:"img/[name].[ext]"}
    }
  ];

  var config = { 
    mode: 'production',

    entry, 
    plugins, 
  
    optimization,  
    resolve: { extensions: ['*', '.js', '.jsx'] },
    module: { rules },
  
    output: { 
      filename: "[name].bundle.js",
      path: `${__dirname}/dist`
    }
  };
  

  return config;
};
