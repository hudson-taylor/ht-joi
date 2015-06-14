
var joi = require('joi');

module.exports = function(schema) {
  return {
    validate: function(data, callback) {
      joi.validate(data, schema, callback);
    }
  }
}
