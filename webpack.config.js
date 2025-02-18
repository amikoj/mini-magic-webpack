const MiniWebpack = require('./lib/mini-magic-webpack');

new MiniWebpack({
  entry: './src/index.js',
  output: './bundle.js'
}).run();