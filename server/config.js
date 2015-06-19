var fs = require('q-io/fs');
var crypto = require('crypto');
var yaml = require('js-yaml');
var extend = require('object-assign');

function getHash(value) {
  var shasum = crypto.createHash('sha1');
  shasum.update(JSON.stringify(value));
  return shasum.digest('hex');
}

function withId(control) {
  return extend({}, control, {
    id: getHash(control),
  });
}

function withIds(config) {
  return extend({}, config, {
    controls: config.controls.map(withId),
  });
}

exports.readFromFile = function readFromFile(fileName) {
  return fs.read(fileName)
    .then(function(str) {
      return withIds(yaml.safeLoad(str));
    });
}