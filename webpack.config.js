const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MediaQueryPlugin = require('media-query-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
const devMode = true;

module.exports = {
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    output: {
        filename: devMode ? '[name].bundle.js' : '[hash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                MediaQueryPlugin.loader,
                {
                    loader: 'sass-loader',
                    options: {
                        implementation: require('sass'),
                    },
                },
                'sass-loader',
            ],
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My website',
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
        }),
        new MediaQueryPlugin({
            include: [
                'style'
            ],
            queries: {
                'print, screen and (min-width: 786px)': 'desktop'
            }
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
};