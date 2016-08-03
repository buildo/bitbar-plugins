require('babel-register')({
   presets: ['es2015'],
   plugins: ['transform-object-rest-spread']
});

const GithubBitbarCounter = require('./github-bitbar-counter').default;

module.exports = function(config) {
  return function() {
    return GithubBitbarCounter(config).apply(undefined, [].concat(Array.prototype.slice.call(arguments)));
  }
}
