# ht-joi

This library makes Joi schemas compatible with hudson-taylor

*Requires HT >6.0.0*

## Example

```js

var joi   = require('joi');
var htjoi = require('ht-joi');

// setup your ht service and stuff here

var schema = htjoi(joi.string().required());

service.on("echo", schema, function(data, callback) {
  return callback(null, data);
});

```

## License

MIT
