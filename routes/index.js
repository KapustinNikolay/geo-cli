/**
 * Created by nikolay on 01.08.15.
 */
var signals = require('./signals');
var validate = require('./../validator');

module.exports = function (io) {
  io.on('connection', function (socket) {
    socket.route = socketRoute;

    for (var i in signals) {
      if (signals.hasOwnProperty(i)) {
        socket.route(i, signals[i])
      }
    }
  });
};

function socketRoute(event, handler) {
  var socket = this;
  socket.on(event, function(req, callback) {
      req = {
        data: req,
        socket: socket
      };

      if (typeof(callback) != 'function') {
        callback = function() {
          logger.error('Callback is not a function');
        }
      }

      validate(req.data, event, function(err) {
          if (err) return callback(err);

          handler(req, function (err, data) {
              if (err) {
                console.error(err);
                return callback('internal error');
              }
              console.info('Event "%s" registered, userId %s', event, socket.userId);
              callback(data);
            }
          );
        }
      );
    }
  );
}