/**
 * Created by nikolay on 01.08.15.
 */
var socket = io.connect('/');

var network = {
  savePos: function(point, marker) {
    socket.emit('savePos', point, function(result) {
      if (result.success) {
        marker._id = result._id;
      } else {
        mapManager.map.removeLayer(marker);
      }
    });
  },
  messages: function(marker) {
    var _id = marker._id;
    model.items.removeAll();
    socket.emit('messages', {_id: _id}, function(result) {
      if (result.success) {
        var data = result.data;

        model.theme(data.theme);
        model._id(data._id);
        data.messages.forEach(function(i) {
          model.items.push(i);
        });

        socket.off('newMsg').on('newMsg', addMessageToModel);
      }
    });
  },
  pushMessage: function(message, callback) {
    socket.emit('pushMessage', message, callback);
  },
  points: function(coords, callback) {
    socket.emit('points', coords, callback);
  }
};

function addMessageToModel(data) {
  if (data._id == model._id()) {
    model.items.push(data.msg);
    $('.chat-panel-hide .panel-body').scrollTop(10000);
  }
}