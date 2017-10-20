## R2D2 React WordPress Theme

WordPress theme project with Yarn, Webpack, BrowserSync and React. Tailored to creating a wp-admin page, but completely flexible and can be used for themes as well.


### Getting started

1. Clone repo to your `wp-content/plugins` folder
1. In `config.json` change the `proxyURL` to point to your WordPress admin page or plugin page.
1. Activate the plugin in wp-admin
1. `cd` into your checked out folder and run `yarn`
1. Run `yarn start` to get Webpack and BrowserSync running

To build for production run:

`yarn build`

A production-ready React `bundle.js` file will be written to `dist/budle.js`.