const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/built');
const APP_DIR = path.resolve(__dirname, 'app');

const config = {
	// watch: true,
	target: 'electron-renderer',
	node: {
		__dirname: true
	},
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: [".jsx", ".js"]
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.css$/, loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]' },
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=99999' }
		]
	},
	plugins: [
		new UglifyJSPlugin()
	]
};

module.exports = config;