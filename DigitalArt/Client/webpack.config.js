const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'index.js',
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader' , 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new ExtractTextPlugin('style.css')
    ]
};

module.exports = (env, options) => {
    let isProduction = options.mode === 'production';

    conf.devtool = isProduction
        ? false
        : 'eval-sourcemap';
    return conf;
};