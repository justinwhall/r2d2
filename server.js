/**
 * Require Browsersync along with webpack and middleware for it
 */
var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
const config = require( './config.json' );

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('./webpack.config');
var bundler = webpack(webpackConfig);

/**
 * Wait for webpack --watch to build bundle.js if it dosnt' exist
 */
setTimeout( function () {

	/**
	 * Run Browsersync and use middleware for Hot Module Replacement
	 */
	browserSync({
		proxy: {
		target: config.proxyURL,
		middleware: [
			webpackDevMiddleware(bundler, {
			// IMPORTANT: dev middleware can't access config, so we should
			// provide publicPath by ourselves
			publicPath: '/dist/',

			// pretty colored output
			stats: { colors: true }

			// for other settings see
			// http://webpack.github.io/docs/webpack-dev-middleware.html
			}),

			// bundler should be the same as above
			webpackHotMiddleware(bundler)
		]
		},

		// prevent opening a new window.
		open: true,

		// no need to watch '*.js' here, webpack will take care of it for us,
		// including full page reloads if HMR won't work
		files: [

		]
	});
}, 3000)
