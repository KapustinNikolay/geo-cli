/**
 * Created by nikolay on 29.07.15.
 */
var mapManager = new MapManager();
$(document).ready(function() {
  mapManager.init();

  $('.fixed-block').find('button').on('click', function(e) {
    //var point = L.point(e.pageX, e.pageY);
    //var latlng = mapManager.map.layerPointToLatLng(point);
    var elements = $(this).siblings();
    var theme = elements.find('#theme');
    var message = elements.find('#message');

    if (theme.val() && message.val()) {
      var marker = mapManager.addMarker({lat: 82.447, lng: -21.302}, theme.val());

      $('#map').one('click', function() {
        storage[marker._leaflet_id] = {
          theme: theme.val(),
          messages: [{name:'PEDIK', message: message.val()}]
        };
        theme.val('');
        message.val('');
        marker.on('click', markerOnClick);
      });

      function markerOnClick(e) {
        var id = e.target._leaflet_id;
        if (storage[id]) {
          model.markerId = id;
          model.items.removeAll();
          storage[id].messages.forEach(function(i) {
            model.items.push(i);
          });
          model.theme(storage[id].theme);
        }
      }
    }
  });

  ko.applyBindings(model);
});


var storage = {};
