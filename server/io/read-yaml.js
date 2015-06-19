import fs from 'q-io/fs';
import yaml from 'js-yaml';

module.exports = function(fileName) {
  return function() {
    return fs.read(fileName)
      .then(str => yaml.safeLoad(str));
  }
};