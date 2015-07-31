/**
 * Created by nikolay on 29.07.15.
 */
var MapManager = function() {
  this.map = null;
  this.markers = [];
  this.markerInAction = false;
};

MapManager.prototype.init = function() {
  this.map = L.map('map',{
    center: [45.059, 39.005],
    zoom: 15,
    zoomControl: false,
    doubleClickZoom: false
  });
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
  //this.map.addLayer(new L.Google('ROADMAP'));

  this.myIcon = L.icon({
    iconUrl: 'bower_components/leaflet/dist/images/marker-icon.png',
    iconRetinaUrl: './../bower_components/leaflet/dist/images/marker-icon.png',
    iconSize: [35, 55],
    iconAnchor: [18, 68],
    popupAnchor: [0, -65]/*,
    shadowUrl: 'bower_components/leaflet/dist/images/marker-shadow.png',
    shadowRetinaUrl: 'bower_components/leaflet/dist/images/marker-shadow.png',
    shadowSize: [68, 75],
    shadowAnchor: [22, 82]*/
  });

};

MapManager.prototype.addMarker = function(latlng, theme) {
  if (this.markerInAction) return false;
  this.markerInAction = true;
  var self = this;
  var map = this.map;
  this.markers.forEach(function(i) {
    map.removeLayer(i);
  });

  var popup = L.popup().setContent('<p>' + theme + '</p>');

  var marker = L.marker(latlng, {
    draggable: true,
    clickable: true,
    icon: this.myIcon
  }).addTo(map).bindPopup(popup);

  var element = $('.chat-panel-hide');

  function mouseMove(e) {
    var latlng = e.latlng;
    marker.setLatLng(latlng);
  }

  function clickOnMap(e) {
    self.markerInAction = false;
    marker.dragging.disable();
    map.off('mousemove');

    self.markers.forEach(function(i) {
      i.addTo(map);
    });
  }

  function closePopup(e) {
    map.dragging.enable();
    map.scrollWheelZoom.enable();
    element.removeClass('chat-panel-vis').css({
      left: '-50px',
      top: '-50px'
    });
    $('#map, .fixed-block').removeClass('blur');
  }

  function openPopup(e) {
    map.panTo(e.latlng);
    setTimeout(function() {
      var body = $('body');
      var x = body.width() / 2;
      var y = body.height() / 2;

      element.css({
        'top': y + element.outerHeight() / 2 + 'px',
        'left': x - element.width() / 2 + 'px'
      }).addClass('chat-panel-vis');

      map.dragging.disable();
      map.scrollWheelZoom.disable();
      $('#map, .fixed-block').addClass('blur');
      map.on('click', closePopup);
    }, 300)
  }

  marker.on('click', openPopup);
  marker.on('mouseover', marker.openPopup);
  marker.on('mouseout', marker.closePopup);
  map.on('mousemove', mouseMove);
  map.on('click', clickOnMap);
  this.markers.push(marker);
  return marker;
};