
var joi = require('joi');

var fn = function(schema) {
  return {
    validate: function(data, callback) {
      joi.validate(data, schema, callback);
    },
    document: function() {
      return joi.compile(schema);
    }
  }
}

fn.generate = function(schema) {
  return fn(joi.compile(schema));
}

module.exports = fn;
