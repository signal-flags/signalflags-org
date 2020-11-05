// src/signal-flags/index.js
const SignalFlags = require('signal-flags');

function configFunction(eleventy) {
  eleventy.addShortcode('signalFlag', SignalFlagShortcode);
}

function SignalFlagShortcode(name, options) {
  return SignalFlags.get(name, options);
}

module.exports = {
  configFunction,
};
