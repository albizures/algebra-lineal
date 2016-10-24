var getConfig = require('hjs-webpack')


const config = getConfig({
  in: 'src/index.js',
  out: 'public',
  html: false,
  clearBeforeBuild: true,
  devServer: false,
  isDev: true
});
config.watch = true;
config.entry = './src/index.js';
delete config.devServer;
config.plugins = [];
config.devtool = 'eval';

module.exports = config;