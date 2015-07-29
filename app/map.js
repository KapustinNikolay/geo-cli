/**
 * Created by nikolay on 29.07.15.
 */
var MapManager = function() {
    this.map = null;
    this.markers = [];
};

MapManager.prototype.init = function() {
    this.map = L.map('map').setView([45.059, 39.005], 15);
    this.map.addLayer(new L.Google('ROADMAP'));
};

MapManager.prototype.addMarker = function(latlng) {
    var marker = L.marker(latlng, {
        draggable: true,
        clickable: true
    }).addTo(this.map);
    this.markers.push(marker);

    console.log(marker)
};

