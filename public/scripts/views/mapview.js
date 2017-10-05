'use strict';

var app = app || {};

(function(module) {

  const mapThings = {};

  mapThings.userLocation;
  mapThings.map;
  mapThings.infoWindow;
  mapThings.geocoder;
  mapThings.markerWindow;
  mapThings.directionsService;
  mapThings.directionsDisplay;

  mapThings.initMap = function initMap() {
    mapThings.directionsService = new google.maps.DirectionsService;
    mapThings.directionsDisplay = new google.maps.DirectionsRenderer;
    mapThings.geocoder = new google.maps.Geocoder();
    mapThings.map = new google.maps.Map(document.getElementById('google-map'), {
      center: {lat: 47.608, lng: -122.335167},
      zoom: 13
    });
    mapThings.directionsDisplay.setMap(mapThings.map);

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
      })
      var infoMarker = new google.maps.InfoWindow({
        content: `<p>${ele.group_name} at</p> <p>${ele.location_name}</p><p>starts at ${ele.time}.</p><input type="button" id="marker${idx}" onclick="alert('foo')" value="Get Directions">`
      })
      marker.addListener('click', function() {
        infoMarker.open(mapThings.map, marker);
      })
      $(`#marker${idx}`).on('click', (directionsService, directionsDisplay) => {
        console.log('Hi Nathan');
        mapThings.directionsService.route({
          origin: mapThings.userLocation,
          destination: marker.position,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            mapThings.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        })
      });
    })
  };
  module.mapThings = mapThings;
})(app);
