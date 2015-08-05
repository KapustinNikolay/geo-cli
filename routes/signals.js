/**
 * Created by nikolay on 01.08.15.
 */
var lib = require('./../lib');

module.exports = {
  savePos: function(req, callback) {
    lib.savePos(req.data, function(err, data) {
      callback(err, {success: !err, _id: data.insertedId});
    });
  },
  messages: function(req, callback) {
    lib.messages(req.data._id, function(err, data) {
      callback(err, {success: !err, data: data});

      if (!err) {
        req.socket.leaveAll();
        req.socket.join('point:' + req.data._id);
      }
    })
  },
  pushMessage: function(req, callback) {
    lib.pushMessage(req.data, function(err) {
      callback(err, {success: !err});

      if (!err) {
        io.to('point:' + req.data._id).emit('newMsg', {
          _id: req.data._id,
          msg: {
            name: req.data.name, message: req.data.message
          }
        });
      }
    });
  },
  points: function(req, callback) {
    lib.points(req.data, function(err, data) {
      if (err) return callback(err);

      data = data.map(function(i) {
        i.position = {
          lat: i.position.coordinates[1],
          lng: i.position.coordinates[0]
        };
        return i;
      });
      callback(null, data);
    });
  }
};