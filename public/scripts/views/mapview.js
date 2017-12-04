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
    $('#meetings-area').hide();
    $('#legend').hide();
    $('#legend-thing').hide();
    mapThings.directionsService = new google.maps.DirectionsService;
    mapThings.directionsDisplay = new google.maps.DirectionsRenderer;
    mapThings.geocoder = new google.maps.Geocoder();
    mapThings.map = new google.maps.Map(document.getElementById('google-map'), {
      center: {lat: 47.608, lng: -122.335167},
      zoom: 12
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
        mapThings.infoWindow.setContent('Your Location');
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
      var infoMarker = new google.maps.InfoWindow({
        content: `<p class="info-bold">${ele.group_name}</p><p>${ele.location_name} (${ele.street})</p><p class="info-bold">${ele.time}</p><input type="button" id="marker${idx}"
        onclick="
                (() => {
        app.mapThings.directionsService.route({
          origin: app.mapThings.userLocation,
          destination: new google.maps.LatLng(${ele.lat}, ${ele.lng}),
          travelMode: 'DRIVING'
        }, function(response, status) {
          console.log(response);
          console.log(status);
          if (status === 'OK') {
            app.mapThings.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      })();
        " value="Get Directions">`
      });
      marker.addListener('click', function() {
        infoMarker.open(mapThings.map, marker);
      });
    });
  };
  module.mapThings = mapThings;
})(app);
