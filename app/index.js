/**
 * Created by nikolay on 29.07.15.
 */
var mapManager = new MapManager();
$(document).ready(function() {
    mapManager.init();

    $('#button').on('click', function(e) {
        var latlng = mapManager.map.getCenter();
        mapManager.addMarker(latlng);
    });

    ko.applyBindings(model);
});
