/**        console.log(req.socket.rooms);
 * Created by nikolay on 29.07.15.
 */
var mapManager = new MapManager();
var storage = {};

$(document).ready(function() {
  ymaps.ready(function() {
    var geo = ymaps.geolocation;
    mapManager.init(geo.latitude, geo.longitude);
  });

  if (!localStorage.hasOwnProperty('name')){
    var btn = $('.started button');
    var inp = $('.started input');

    btn.on('click', function() {
      var name = inp.val();
      localStorage.setItem('name', name);
      removeBlur();
      updateMap();
      setInterval(updateMap, 5000);
      mapManager.map.on('dragend', updateMap);
    });

    inp.keypress(function(e) {
      if (e.charCode == 13) btn.trigger('click');
    });
  } else {
    removeBlur();
    updateMap();
    setInterval(updateMap, 5000);
    mapManager.map.on('dragend', updateMap);
  }

  $('.fixed-block button').on('click', function(e) {
    if (this.markerInAction) return false;
    mapManager.markerInAction = true;

    mapManager.markers.forEach(function(i) {
      mapManager.map.removeLayer(i);
    });

    var elements = $(this).siblings();
    var theme = elements.find('#theme');
    var message = elements.find('#message');

    if (theme.val() && message.val()) {
      var marker = mapManager.addMarker({lat: 82.447, lng: -21.302}, theme.val(), true);

      $('#map').one('click', function() {
        var point = {
          position: marker._latlng,
          theme: theme.val(),
          messages: [{name: localStorage.name, message: message.val()}]
        };

        mapManager.markerInAction = false;
        marker.dragging.disable();
        mapManager.map.off('click mousemove');

        mapManager.markers.forEach(function(i) {
          i.addTo(mapManager.map);
        });

        network.savePos(point, marker);
        theme.val('');
        message.val('');
        mapManager.markers.push(marker);
      });

      function mouseMove(e) {
        var latlng = e.latlng;
        marker.setLatLng(latlng);
      }

      mapManager.map.on('mousemove', mouseMove);
    }
  });

  $('.chat-panel-hide input').keyup(function(e) {
    if (e.keyCode == 13) {
      model.submit(null, e);
    }
  });

  ko.applyBindings(model);
});


function removeBlur() {
  $('.started, .cover').remove();
  $('#map, .fixed-block').removeClass('blur');
}

function updateMap() {
  var center = mapManager.map.getCenter();
  network.points(center, function(points) {
    var markers = mapManager.markers;
    var markerIds = markers.map(function(i) {
      return i._id;
    });

    points.forEach(function(i) {
      var index = markerIds.indexOf(i._id);
      if (index == -1) {
        mapManager.addMarker(i.position, i.theme, false, i._id);
      } else markerIds.splice(index, 1);
    });

    for (var i = markers.length - 1; i >= 0; i--) {
      if (~markerIds.indexOf(markers[i]._id) && !markers[i].options.draggable) {
        mapManager.map.removeLayer(markers[i]);
        markers.splice(i,1);
      }
    }
  });
}