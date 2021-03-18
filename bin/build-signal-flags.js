const { writeFile, mkdir, rmdir } = require('fs/promises');
const { join } = require('path');
const { exec } = require('child_process');

const sf = require('signal-flags');

global.btoa = (b) => Buffer.from(b).toString('base64');

const shape = 'square';
const outline = false;
const colors = 'primary';
const dataUri = true;

const dataFiles = [
  ['sfOutline', { dataUri }],
  ['sfNoOutline', { dataUri, outline }],
  ['sfSquareOutline', , { dataUri, shape }],
  ['sfSquareNoOutline', { dataUri, shape, outline }],
  ['sfSquareNoOutlinePrimary', { dataUri, colors, shape, outline }],
];

async function writeDataFiles() {
  const dataPath = join(__dirname, '..', 'data', 'sfDataUri');
  await rmdir(dataPath, { recursive: true });
  await mkdir(dataPath, { recursive: true });
  const flags = sf.all({ dataUri: true });
  dataFiles.forEach(async ([fname, options]) => {
    await writeFile(
      join(dataPath, `${fname}.json`),
      JSON.stringify(sf.all(options), null, 2) + '\n'
    );
  });
}

async function copyAssetFiles() {
  exec(`rm -rf static/sf-*`);
  exec(`cp node_modules/signal-flag-images/sf-* static -r`);
}

async function main() {
  writeDataFiles();
  copyAssetFiles();
}

main();
