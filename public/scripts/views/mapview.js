'use strict';

var app = app || {};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    //lat and lng below will need actual geocoded variables
    center: { lat: Geocoded_input lng: Geocoded_input},
    zoom: 16;
  });
}
