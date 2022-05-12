const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { entryPoints } = require("./input");


function inputs(mode) {
    var entry = {};
    var plugins = [
        new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['dist']}),
        new webpack.HotModuleReplacementPlugin()
    ];
    
    if (mode === "production") {
        entryPoints.forEach((point) => {
        if (point.build) {
            entry[point.name] = `./src/${point.name}.js`;
            const options = {
            inject: 'body',
            title: point.name,
            chunks: point.name,
            template: './templates/html.ejs',
            filename: `${point.out}`
            };
            plugins.push(new HtmlWebpackPlugin(options));
        }
        });
    }

    return { entry, plugins };
}

const outputs = (dir) => {
    return{ 
        filename: "[name].bundle.js",
        path: `${dir}/dist`
    }
};


module.exports = { inputs, outputs};