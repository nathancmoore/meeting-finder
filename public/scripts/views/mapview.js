'use strict';

var userLocation;
var map;
var infoWindow;
var geocoder;

function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('google-map'), {
    center: {lat: 47.608, lng: -122.335167},
    zoom: 13
  });
  infoWindow = new google.maps.InfoWindow;

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      userLocation = new google.maps.LatLng(pos.lat, pos.lng);

      infoWindow.setPosition(pos);
      infoWindow.setContent('Current Location');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function makeMarkers() {
  app.meetings.timeTarget.forEach((ele, idx) => {
    geocoder.geocode( { 'address': ele.street}, function(results, status) {
      if (status === 'OK') {
        var mtgLocation = new google.maps.LatLng(results[idx].geometry.location.lat(),results[idx].geometry.location.lng())
        var distanceBetween = (0.000621371 * google.maps.geometry.spherical.computeDistanceBetween(userLocation, mtgLocation));
        console.log(distanceBetween)
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      }
    }
    )})
}
