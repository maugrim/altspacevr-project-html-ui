var path = require("path");

module.exports = {
    entry: {
        app: "./js/app.jsx"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader", query: { presets: ["react"] } },
            { test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader" }
        ]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].bundle.js"
    }
};
