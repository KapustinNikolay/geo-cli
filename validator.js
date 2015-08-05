/**
 * Created by nikolay on 01.08.15.
 */
var zSchema = require("z-schema");
var settings = require('./settings.json');
var validator = new zSchema(settings.validator);

module.exports = function(data, event, callback) {
  if (!(event in schemas)) return callback();
  if (data && validator.validate(data, schemas[event])) return callback();
  var err = validator.getLastErrors();

  console.error('Invalid data was sent with event %s', event, data, err);
  callback(err);
};

var schemas = {
  savePos: {
    type: 'object',
    required:['theme', 'messages'],
    properties: {
      theme: {type:'string', minLength: 1, maxLength: 50},
      messages: {
        type: 'array',
        minLength: 1,
        items: {
          type: 'object',
          required: ['name', 'message'],
          properties: {
            name: {type:'string', minLength: 1, maxLength: 30},
            message: {type:'string', minLength: 1, maxLength: 500}
          }
        }
      },
      position: {
        type: 'object',
        required: ['lat', 'lng'],
        properties: {
          lat: {type:'number'},
          lng: {type:'number'}
        }
      }
    }
  },
  messages: {
    type: 'object',
    required: ['_id'],
    properties: {
      _id: {type: 'string'}
    }
  },
  pushMessage: {
    type: 'object',
    required: ['_id', 'name', 'message'],
    properties: {
      _id: {type: 'string'},
      name: {type:'string', minLength: 1, maxLength: 30},
      message: {type:'string', minLength: 1, maxLength: 500}
    }
  },
  points: {
    type: 'object',
    required: ['lat', 'lng'],
    properties: {
      lat: {type:'number'},
      lng: {type:'number'}
    }
  }
};