
var assert = require('assert');
var ht     = require('hudson-taylor');
var joi    = require('joi');

var htJoi = require('../lib');

describe("HT Joi", function() {

  var service, client;

  before(function() {

    var transport = new ht.Transports.Local();

    service = new ht.Service(transport);

    var schema = htJoi(joi.object().keys({
      username: joi.string().min(2).max(5).required(),
      password: joi.string().min(8).required()
    }));

    service.on("login", schema, function(data, callback) {
      return callback(null, data);
    });

    client = new ht.Client({
      s1: transport
    });

  });

  it("should wrap joi schemas", function(done) {

    client.call("s1", "login", {
      username: "hello",
      password: "world1234"
    }, function(err, data) {
      assert.ifError(err);
      assert.equal(data.username, "hello");
      assert.equal(data.password, "world1234");
      done();
    });

  });

  it("should properly return errors", function(done) {

    client.call("s1", "login", {
      hello: "world"
    }, function(err) {
      assert.equal(err.$htValidationError, true);
      assert.equal(err.error, 'child "username" fails because ["username" is required]');
      done();
    });

  });

  describe("document/generate", function() {

    it("should convert schema to literal schema and back", function() {

      var _schema = [
        'key',
        5
      ];

      var joiSchema = joi.compile(_schema);

      var htSchema = htJoi(_schema);

      assert.deepEqual(joi.compile(joiSchema), htSchema.document());

    });

  });

});
