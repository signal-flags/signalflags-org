# Signal Flags GitHub Pages site

> Free Signal Flag images

## Development

### File structure

```yaml
bin                    # Scripts.
docs                   # The public build directory.
site                   # The contents, tempates, data etc. for the site.
site/content           # Content goes here.
site/data              # Data goes here.
site/filters/index.js  # Filters exported here are added automagically.
site/layouts           # Layouts go here - they don't need prefixing in source files.
site/plugins/index.js  # Plugins exported here are added automagically.
site/static            # Contents of this directory are copied across to the site intact.
src                    # Site JavaScript and CSS (to be build by Webpack).
```

### Scripts

```bash
$ npm run build    # Build into dist for deployment (does not run Webpack).
$ npm run bundle   # Build Webpack module bundle.
$ npm run lint     # Check lint and prettier.
$ npm run lint:fix # Fix lint and prettier.
$ npm run watch    # ???
$ npm run serve    # Build and run a development server.
$ npm run debug    # Run a DEBUG build.
```
