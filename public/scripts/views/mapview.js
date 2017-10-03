'use strict';

var app = app || {};

var geocoder;
var map;

function initMap() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(47.608, -122.335167);
  var mapSetup = {
    center: latlng,
    zoom: 10
  }
  map = new google.maps.Map(document.getElementById('google-map'), mapSetup);
};

function codeAddress(address) {
  geocoder.geocode( {'address': address}, function(results, status) {
    if(status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      console.log('status');
    }
  }
  )
};
