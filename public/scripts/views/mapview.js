'use strict';

var app = app || {};

(function(module) {

  const mapThings = {};

  mapThings.userLocation;
  mapThings.map;
  mapThings.infoWindow;
  mapThings.geocoder;

  function initMap() {
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
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(mapThings.map);
  }

  function makeMarkers() {
    app.meetings.filtered.forEach((ele, idx) => {
      mapThings.geocoder.geocode({ 'address': ele.street}, function(results, status) {
        if (status === 'OK') {
          var mtgLocation = new google.maps.LatLng(results[idx].geometry.location.lat(),results[idx].geometry.location.lng());
          var distanceBetween = (0.000621371 * google.maps.geometry.spherical.computeDistanceBetween(userLocation, mtgLocation));
          var marker = new google.maps.Marker({
            map: mapThings.map,
            position: results[idx].geometry.location
          });
        }

      }
      );});
  }
  module.mapThings = mapThings;
})(app);
