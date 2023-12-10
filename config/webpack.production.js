const { merge } = require('webpack-merge');
const common = require("./webpack.common");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: "all",
        },
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        inline: false
                    }
                }
            })
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/views/index.html',
            title: 'Webpack: AngularJS configuration',
            inject: 'body',
        })
    ]
});