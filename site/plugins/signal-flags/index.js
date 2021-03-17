// src/signal-flags/index.js
const SignalFlags = require('signal-flags');

global.btoa = (b) => Buffer.from(b).toString('base64');

function configFunction(eleventy) {
  eleventy.addShortcode('signalFlag', SignalFlagShortcode);
  eleventy.addShortcode('sfImgSrc', sfImgSrc);
}

function sfImgSrc(name, options) {
  return SignalFlags.get(name, { ...options, file: false, dataUri: true });
}

function SignalFlagShortcode(name, options) {
  return SignalFlags.get(name, options);
}

module.exports = {
  configFunction,
};
