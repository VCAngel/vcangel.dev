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
    module: {
        rules: [
            {
                test: /\.jsx?$/,
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
                test: /\.png|svg|jpe?g|gif$/i,
                use: [{
                    loader: "image-webpack-loader",
                    options: {
                        name: "public/imgs/[name].[ext]",
                        disable: true,
                        mozjpeg: {
                            quality: "50",
                            progressive: true,
                        },
                        optipng: {
                            optimizationLevel: 5,
                        },
                        pngquant: {
                            enabled: false,
                        },
                        gifsicle: {
                            enabled: false,
                        },
                        webp: {
                            enabled: false,
                        }
                    }
                }, "file-loader"],
                type: "asset/resource",
            }
        ]
    },
    mode: "development",
}