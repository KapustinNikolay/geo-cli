/**
 * Created by nikolay on 01.08.15.
 */
var ZSchema = require("z-schema");
var settings = require('./settings.json');
var validator = new ZSchema(settings.validator);

module.exports = function(data, schemaName) {
  if (!schemas[schemaName]) return 'validation schema not allowed';
  validator.validate(data, schemas[schemaName]);
  return validator.getLastErrors();
};

var schemas = {
  savePos: {
    type: 'object',
    required:['theme', 'name', 'messages'],
    properties: {
      a: {type:'string'}
    }
  }
};