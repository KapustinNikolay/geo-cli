/**
 * Created by nikolay on 01.08.15.
 */
var ZSchema = require("z-schema");
var settings = require('./settings.json');
var validator = new ZSchema(settings.validator);

module.exports = function(data, schemaName) {
  if (!schemas[schemaName]) return null//'validation schema not allowed';
  validator.validate(data, schemas[schemaName]);
  return validator.getLastErrors();
};

var schemas = {
  newItem: {
    type: 'object',
    required:['theme', 'name', 'messages'],
    properties: {
      name: {type:'string', minLength: 1, maxLength: 30},
      theme: {type:'string', minLength: 1, maxLength: 50},
      messages: {type:'string', minLength: 1, maxLength: 500}
    }
  }
};