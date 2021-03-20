# Signal Flags GitHub Pages site

> Free Signal Flag images

## Development

Moved to Hugo.
| | |
|--|--|
| `some/path/signalflags.org` | this repo
| `some/path/signalflags.org/signal-flags.github.io` | github pages repo
| `some/path/signalflags.org/signal-flags.github.io/docs` | build target for hugo
| `some/path/signal-flags-js/` | local copy of `signal-flags` npm module

````

### Scripts

```console
$ npm run build:signal-flags # Build from signal-flags and signal-flags-images.
$ npm run build    # Build into docs for publication.
$ npm run lint     # Check lint and prettier.
$ npm run lint:fix # Fix lint and prettier.
$ npm run serve    # Build and run a development server.
````
