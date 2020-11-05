// site/plugins/index.js
// const pluginRss = require('@11ty/eleventy-plugin-rss');
// const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');

const SignalFlags = require('./signal-flags');

// module.exports = [pluginRss, pluginSyntaxHighlight, pluginNavigation];
module.exports = [pluginNavigation, SignalFlags];
