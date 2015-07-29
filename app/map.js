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
    var map = this.map;
    var marker = L.marker(latlng, {
        draggable: true,
        clickable: true
    }).addTo(map);

    function changeItemPos(element, points) {
        element.css({
            'top': points.y - element.outerHeight() - 40 + 'px',
            'left': points.x - element.width() / 2 + 'px'
        }).show();
    }

    marker.on('click', function(e) {
        var element = $('.chat-panel');
        var points = map.latLngToLayerPoint(e.latlng);
        changeItemPos(element, points);

        map.on('zoomend drag', function() {
            console.log(e.latlng)
            points = map.latLngToLayerPoint(e.latlng);
            console.log(points);
            changeItemPos(element, points);
        });
    });

    this.markers.push(marker);
};