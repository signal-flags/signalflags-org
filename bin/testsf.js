const SignalFlags = require('signal-flags');

global.btoa = (b) => Buffer.from(b).toString('base64');

const a = SignalFlags.get('y', { dataUri: true });

console.log(a);
