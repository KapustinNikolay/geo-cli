/**
 * Created by nikolay on 01.08.15.
 */
var settings = require('./settings.json');
var async = require('async');
var mongodb = require('mongodb');

module.exports = function(app, io, server) {
  async.parallel(
    [
      function(next) {
        mongodb.connect(settings.mongoUrl, function(err, connect) {
          if (connect) global.db = connect;
          next(err);
        });
      }
    ], function(err) {
      server.listen(settings.port);
      console.log(err || "Server started on %s port", settings.port);
      require('./routes')(io);
    }
  );
};