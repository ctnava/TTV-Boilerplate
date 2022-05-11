const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = () => {
  const rules = [
    {
      test: /\.(js|jsx)$/i,
      // exclude: /(node_modules|bower_components)/,
      loader: "babel-loader"
    },{
      test: /\.css$/i,
      use: ["style-loader", "css-loader"]
    },{
      test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      type: "asset",
      loader: "file-loader", 
      options:{name:"img/[name].[ext]"}
    }
  ];
  
  var plugins = [
    new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['dist']}),
    new webpack.HotModuleReplacementPlugin()
  ];

  let devServer;
  const isDevrig = mode === "devrig";
  devServer = {
    static: `${__dirname}/public`,
    host: isDevrig ? 'localhost.rig.twitch.tv' : 'localhost',
    headers: {'Access-Control-Allow-Origin': '*'},
    port: 8080,
    https: isDevrig
  };
  

  var config = { 
    mode: 'development',

    entry: {}, 
    plugins, 
  
    optimization: { minimize:false },  
    resolve: { extensions: ['*', '.js', '.jsx'] },
    module: { rules },
  
    output: { 
      filename: "[name].bundle.js",
      path: `${__dirname}/dist`
    }
  };
  console.log(process.env)
  if (devServer) config["devServer"] = devServer;
  return config;
};
