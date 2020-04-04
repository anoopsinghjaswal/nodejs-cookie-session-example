// Transpile all code following this line
require('@babel/polyfill');
require('@babel/register')({
    presets: ['@babel/preset-env'],
});

// Import your app
module.exports = require('./server.js');
