/**
 * Created by nikolay on 01.08.15.
 */
var signals = require('./signals');
var validator = require('./../validator');

module.exports = function (io) {
  io.on('connection', function (socket) {
    for (var i in signals) {
      if (signals.hasOwnProperty(i)) {
        socket.on(i, function (data, res) {
          var callback = !res || typeof res != 'function' ?
            function () {
              console.error('Callback is not a function');
            } :
            function (err, data) {
              if (err) {
                console.error(err);
                res('internal error')
              } else {
                res(data);
              }
            };

          var validatorError = validator(data, i);
          if (validatorError) return callback(validatorError);
          signals[i](data, callback);
        });
      }
    }
  });
};