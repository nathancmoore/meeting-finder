'use strict';

var app = app || {};

(function(module) {

  const mapThings = {};

  mapThings.userLocation;
  mapThings.map;
  mapThings.infoWindow;
  mapThings.geocoder;
  mapThings.markerWindow;

  mapThings.initMap = function initMap() {
    mapThings.geocoder = new google.maps.Geocoder();
    mapThings.map = new google.maps.Map(document.getElementById('google-map'), {
      center: {lat: 47.608, lng: -122.335167},
      zoom: 13
    });
    mapThings.infoWindow = new google.maps.InfoWindow;

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        mapThings.userLocation = new google.maps.LatLng(pos.lat, pos.lng);

        mapThings.infoWindow.setPosition(pos);
        mapThings.infoWindow.setContent('Current Location');
        mapThings.infoWindow.open(mapThings.map);
        mapThings.map.setCenter(pos);
      }, function() {
        handleLocationError(true, mapThings.infoWindow, mapThings.map.getCenter());
      });
    } else {
      handleLocationError(false, mapThings.infoWindow, mapThings.map.getCenter());
    }
    google.maps.event.addDomListener(window, 'resize', function () {
      var center = mapThings.map.getCenter();
      google.maps.event.trigger(mapThings.map, 'resize');
      mapThings.map.setCenter(center);
    })
    var markerInfo = `<p>Test String</p>`;
    mapThings.markerWindow = new google.maps.InfoWindow({
      content: markerInfo
    });
    mapThings.marker.addListener('click', function() {
      mapThings.markerWindow.open(mapThings.map, mapThings.marker)
    });
  };

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(mapThings.map);
  }

  mapThings.makeMarkers = function () {
    app.meetings.filtered.forEach((ele, idx) => {
      var marker = new google.maps.Marker({
        map: mapThings.map,
        position: new google.maps.LatLng(ele.lat, ele.lng)
      });
    });
  };
  module.mapThings = mapThings;
})(app);
