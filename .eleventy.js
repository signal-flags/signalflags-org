const fs = require('fs');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const filters = require('./site/filters');
const plugins = require('./site/plugins');

const eleventyOptions = {
  templateFormats: ['md', 'njk', 'html', 'liquid'],

  // If your site lives in a different subdirectory, change this.
  pathPrefix: '/',

  markdownTemplateEngine: 'liquid',
  htmlTemplateEngine: 'njk',
  dataTemplateEngine: 'njk',

  // Override default directories.
  dir: {
    output: 'docs',
    input: 'site/content',
    // Relative to `input`.
    includes: '../includes',
    layouts: '../layouts',
    partials: '../partials',
    data: '../data',
  },
};

function installExtension({ plugins, filters, install }, eleventyConfig) {
  // Install any filters.
  if (filters) {
    Object.entries(filters).forEach(([name, filter]) => {
      eleventyConfig.addFilter(name, filter);
    });
  }

  // Install any plugins.
  if (plugins) {
    plugins.forEach((plugin) => {
      eleventyConfig.addPlugin(plugin);
    });
  }
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  // Alias layouts in case we change the template engine later.
  eleventyConfig.addLayoutAlias('page', 'page.njk');

  eleventyConfig.addPassthroughCopy({ 'site/static': '/' });

  installExtension({ filters }, eleventyConfig);
  installExtension({ plugins }, eleventyConfig);

  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case 'all':
            case 'nav':
            case 'post':
            case 'posts':
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    // breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#',
  });
  eleventyConfig.setLibrary('md', markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync(
          `${eleventyOptions.dir.output}/404.html`
        );

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return eleventyOptions;
};
