const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./src/App.jsx",
    output: {
        filename: "bundle.[fullhash].js",
        path: path.resolve(__dirname, "public"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    },
    ignoreWarnings: [
        {
            module: /\index.jsx?/
        }
    ],
    module: {
        rules: [
            {
                test: /\.jsx?|tsx?$/,
                exclude: /node_modules/,
                loader: require.resolve("babel-loader"),
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.png|jpe?g|gif$/i,
                type: "asset/resource",
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: '@svgr/webpack',
                    options: {
                        exportType: 'named',
                    }
                }, 'file-loader']
            }
        ]
    },
    mode: "development",
}