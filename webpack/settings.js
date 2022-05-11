const optimization  = { minimize:false };
const resolve       = { extensions: ['*', '.js', '.jsx'] }
const ruleSet       = (loader) => {
    return [
        {
        test: /\.(js|jsx)$/i,
        // exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        },{
        test: /\.css$/i,
        use: [loader, "css-loader"],
        },{
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
        loader: "file-loader", 
        options:{name:"img/[name].[ext]"}
        }
    ]
}


module.exports = { optimization, resolve, ruleSet }