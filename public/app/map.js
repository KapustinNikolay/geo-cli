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
    markerZoomAnimation: false,
    zoomControl: false,
    doubleClickZoom: false
  });

  var dgis = new L.DGis();
  this.map.addLayer(dgis);
  //L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
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

MapManager.prototype.addMarker = function(latlng, theme, isNewMarker, _id) {
  var map = this.map;

  var popup = L.popup().setContent('<p>' + theme + '</p>');

  var markerOpt = {
    draggable: !!isNewMarker,
    clickable: true,
    icon: this.myIcon
  };

  var marker = L.marker(latlng, markerOpt).addTo(map).bindPopup(popup);

  if (_id) marker._id = _id;

  var element = $('.chat-panel-hide');

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
    network.messages(marker);
    map.panTo(e.latlng);
    setTimeout(function() {
      var body = $('body');
      var x = body.width() / 2;
      var y = body.height() / 2;

      element.css({
        'top': y + element.outerHeight() / 2 + 'px',
        'left': x - element.width() / 2 + 'px'
      }).addClass('chat-panel-vis').find('.panel-body').scrollTop(10000);

      map.dragging.disable();
      map.scrollWheelZoom.disable();
      $('#map, .fixed-block').addClass('blur');
      map.on('click', closePopup);
    }, 300);
  }

  marker.on('click', openPopup);
  marker.on('mouseover', marker.openPopup);
  marker.on('mouseout', marker.closePopup);
  if (!isNewMarker) this.markers.push(marker);
  return marker;
};