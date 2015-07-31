/**
 * Created by nikolay on 29.07.15.
 */
var MapManager = function() {
  this.map = null;
  this.markers = [];
};

MapManager.prototype.init = function() {
  this.map = L.map('map',{
    center: [45.059, 39.005],
    zoom: 15,
    doubleClickZoom: false
  });
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
  //this.map.addLayer(new L.Google('ROADMAP'));

  this.myIcon = L.icon({
    iconUrl: 'bower_components/leaflet/dist/images/marker-icon.png',
    iconRetinaUrl: './../bower_components/leaflet/dist/images/marker-icon-2x.png',
    iconSize: [45, 75],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -120],
    shadowUrl: 'bower_components/leaflet/dist/images/marker-shadow.png',
    shadowRetinaUrl: 'bower_components/leaflet/dist/images/marker-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 112]
  });

};

MapManager.prototype.addMarker = function(e, context) {
  $(context).off('click');
  var self = this;
  var map = this.map;
  var point = L.point(e.pageX, e.pageY);
  var latlng = map.layerPointToLatLng(point);

  var popup = L.popup().setContent('<p>здеся пьют девятку!!!!</p>');

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
    marker.dragging.disable();
    this.off('mousemove');
    $(context).on('click', function(e) {
      self.addMarker(e, this);
    });
  }

  function closePopup(e) {
    map.dragging.enable();
    map.scrollWheelZoom.enable();
    element.removeClass('chat-panel-vis').css({
      left: '-50px',
      top: '-50px'
    })
  }

  function openPopup(e) {
    var x = e.originalEvent.pageX;
    var y = e.originalEvent.pageY;

    element.css({
      'top': y - element.outerHeight() / 2 + 'px',
      'left': x - element.width() / 2 + 'px'
    }).addClass('chat-panel-vis');

    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.on('click', closePopup);
  }

  marker.on('click', openPopup);
  marker.on('mouseover', marker.openPopup);
  marker.on('mouseout', marker.closePopup);
  map.on('mousemove', mouseMove);
  map.on('click', clickOnMap);

  this.markers.push(marker);
};