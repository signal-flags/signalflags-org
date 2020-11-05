// site/build/index.js

// Build CSS and JS dependencies.

// Note rmdirSync recursive requires node 12
const { rmdir, writeFile } = require('fs').promises;
const { resolve } = require('path');

const webpack = require('webpack');

const webpackConfig = require('../webpack.config.js');

const dataPath = resolve(__dirname, '..', 'site', 'data', 'assets.json');

// Extract the built assets and link the site data to them.
const path = webpackConfig.output.path;
const appJs = '/assets/app/' + webpackConfig.output.filename;
const appCss = '/assets/app/' + webpackConfig.plugins[0].options.filename;

const assets = { appJs, appCss };

writeFile(dataPath, JSON.stringify(assets, null, 2) + '\n');

console.log('Building', { path, appJs, appCss });

// Empty the target directory first.
rmdir(path, { recursive: true }).then(() => {
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(
        'Build errors',
        err,
        stats && stats.compilation && stats.compilation.errors
      );
      throw new Error('Build errors');
    }
    console.log('Build complete');
    // Done processing
    // console.log(stats);
  });
});
