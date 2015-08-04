/**
 * Created by nikolay on 29.07.15.
 */
var mapManager = new MapManager();
var storage = {};

$(document).ready(function() {
  if (localStorage.hasOwnProperty('name')){
    removeBlur();
  } else {
    var btn = $('.started button');
    var inp = $('.started input');

    btn.on('click', function() {
      var name = inp.val();
      localStorage.setItem('name', name);
      removeBlur()
    });

    inp.keypress(function(e) {
      if (e.charCode == 13) btn.trigger('click');
    });
  }
  mapManager.init();

  $('.fixed-block button').on('click', function(e) {
    var elements = $(this).siblings();
    var theme = elements.find('#theme');
    var message = elements.find('#message');

    if (theme.val() && message.val()) {
      console.log(message.val(), theme.val());
      var marker = mapManager.addMarker({lat: 82.447, lng: -21.302}, theme.val());

      $('#map').one('click', function() {
        storage[marker._leaflet_id] = {
          theme: theme.val(),
          messages: [{name: localStorage.name, message: message.val()}]
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


function removeBlur() {
  $('.started, .cover').remove();
  $('#map, .fixed-block').removeClass('blur');
}