const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Path = require('path').posix;
const customInterpolateName = require('./custom-interpolate-name');

module.exports = {
    entry: {
        'a/a': './src/a/index.js',
        'b/b': './src/b/index.js',
    },
    output: {
        path: Path.join(__dirname, 'dest'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({options: {customInterpolateName}}),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.(woff2?|ttf|eot|svg|jpe?g|gif|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: url => Path.basename(url),
                        outputPath: url => Path.join(Path.dirname(Path.dirname(url)), Path.basename(url)),
                        name: '[entryName]/[hash].[ext]',
                    }
                },
            },
        ],
    },
};