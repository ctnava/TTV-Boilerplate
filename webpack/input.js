const entryPoints = [
  {
    name:"VideoComponent",
    path:"./src/VideoComponent.js",
    out:"video_component.html",
    bloat: [
      "VideoOverlay",
      "Panel",
      "Config",
      "LiveConfig",
      "Mobile",
    ],
    build:true
  },{
    name:"VideoOverlay",
    path:"./src/VideoOverlay.js",
    out:"video_overlay.html",
    bloat: [
      "VideoComponent",
      "Panel",
      "Config",
      "LiveConfig",
      "Mobile",
    ],
    build:true
  },{
    name:"Panel",
    path:"./src/Panel.js",
    out:"panel.html",
    bloat: [
      "VideoComponent",
      "VideoOverlay",
      "Config",
      "LiveConfig",
      "Mobile",
    ],
    build:true
  },{
    name:"Config",
    path:"./src/Config.js",
    out:"config.html",
    bloat: [
      "VideoComponent",
      "VideoOverlay",
      "Panel",
      "LiveConfig",
      "Mobile",
    ],
    build:true
  },{
    name:"LiveConfig",
    path:"./src/LiveConfig.js",
    out:"live_config.html",
    bloat: [
      "VideoComponent",
      "VideoOverlay",
      "Panel",
      "Config",
      "Mobile"
    ],
    build:true
  },{
    name:"Mobile",
    path:"./src/Mobile.js",
    out:"mobile.html",
    bloat: [
      "VideoComponent",
      "VideoOverlay",
      "Panel",
      "Config",
      "LiveConfig"
    ],
    build:true
  }
];

const rules = [{
  test: /\.css$/i,
  use: ["style-loader", "css-loader"]
},{
  test: /\.html$/,
  loader: 'html-loader'
},{
  test: /\.(js|jsx)$/i,
  exclude: /(node_modules|bower_components)/,
  loader: "babel-loader"
},{
  test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
  type: "asset",
  loader: "file-loader", 
  options:{name:"img/[name].[ext]"}
}];

const resolve = { extensions: ['*', '.js', '.jsx'] };
const optimization = { minimize:false };

module.exports = { entryPoints, rules, resolve, optimization };