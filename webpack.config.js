const path = require( 'path' );
const webpack = require( 'webpack' );
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const webpackDevMiddleware = require( 'webpack-dev-middleware' );
const webpackHotMiddleware = require( 'webpack-hot-middleware' );
const config = require( './config.json' );

if (process.env.NODE_ENV !== 'production') {
	config.entry = [
		'webpack-hot-middleware/client',
		'./src/index.js'
	]
} else {
	config.entry = ['./src/index.js']
}

const webpackConfig = {
	entry: config.entry,
	output: {
		filename: 'bundle.js',
		path: path.resolve( __dirname, 'dist' ),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [ 'babel-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	// devtool: "eval-source-map",
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.NoErrorsPlugin(),
		new BrowserSyncPlugin( {
				proxy: config.proxyURL,
				files: [
					'**/*.php'
				],
				reloadDelay: 0,
			}
		)
	]
};

if ( process.env.NODE_ENV === 'production' ) {
	const buildFolder = path.resolve( __dirname, 'dist' );

	webpackConfig.plugins.push( new webpack.optimize.UglifyJsPlugin( {
		"mangle": {
			"screw_ie8": true
		},
		"compress": {
			"screw_ie8": true,
			"warnings": false
		},
		"sourceMap": false
	} ) );

	webpackConfig.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
			  NODE_ENV: JSON.stringify('production')
			}
		})
	);

	webpackConfig.output.path = buildFolder;
}

module.exports = webpackConfig;