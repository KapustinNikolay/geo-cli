/**
 * Created by nikolay on 29.07.15.
 */
var mapManager = new MapManager();
$(document).ready(function() {
  mapManager.init();

  $('#button').on('click', function(e) {
    mapManager.addMarker(e, this);
  });

  ko.applyBindings(model);
});
