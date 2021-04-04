const { writeFile, mkdir, rmdir } = require('fs/promises');
const { join } = require('path');
const { exec } = require('child_process');

const sf = require('signal-flags');

const shape = 'square';
const outline = false;
const colors = 'primary';
const dataUri = true;

const dataFiles = [
  ['sfRectangleOutline', { dataUri, type: 'flag' }],
  ['sfRectangleNoOutline', { dataUri, outline, type: 'flag' }],

  ['sfSquareOutline', { dataUri, shape, type: 'flag' }],
  ['sfSquareNoOutline', { dataUri, shape, outline, type: 'flag' }],
  [
    'sfSquareNoOutlinePrimary',
    { dataUri, colors, shape, outline, type: 'flag' },
  ],

  ['sfPennantOutline', { dataUri, type: 'pennant' }],
  ['sfPennantNoOutline', { dataUri, outline, type: 'pennant' }],
  [
    'sfPennantNoOutlinePrimary',
    { dataUri, outline, colors, type: 'pennant', shape: 'short' },
  ],

  ['sfShortOutline', { dataUri, type: 'pennant', shape: 'short' }],
  ['sfShortNoOutline', { dataUri, outline, type: 'pennant', shape: 'short' }],

  ['sfTriangleOutline', { dataUri, type: 'triangle' }],
  ['sfTriangleNoOutline', { dataUri, outline, type: 'triangle' }],
  [
    'sfTriangleNoOutlinePrimary',
    { dataUri, outline, colors, type: 'triangle' },
  ],
];

// Write DataURI files to data/sfDataUri.
async function writeDataFiles() {
  const dataPath = join(__dirname, '..', 'data', 'sfDataUri');
  await rmdir(dataPath, { recursive: true });
  await mkdir(dataPath, { recursive: true });
  // const flags = sf.all({ dataUri: true });
  dataFiles.forEach(async ([fname, options]) => {
    await writeFile(
      join(dataPath, `${fname}.json`),
      JSON.stringify(sf.all(options), null, 2) + '\n'
    );
  });
}

// Copy the current signal-flag-images images to static.
async function copyAssetFiles() {
  exec(`rm -rf static/sf-*`);
  exec(`cp node_modules/signal-flag-images/sf-* static -r`);
}

// Copy the current signal-flag-images/svg.json to data/sf.
async function copySvgFileToData() {
  // exec(`rm -rf static/sf-*`);
  exec(`cp node_modules/signal-flag-images/svg.json data/sf`);
}

async function main() {
  writeDataFiles();
  copyAssetFiles();
  copySvgFileToData();
}

main();
