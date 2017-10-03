'use strict';


var map;
var infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('google-map'), {
    center: {lat: 47.608, lng: -122.335167},
    zoom: 10
  });
  infoWindow = new google.maps.InfoWindow;

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
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





// function initMap() {
//   geocoder = new google.maps.Geocoder();
//   var latlng = new google.maps.LatLng(47.608, -122.335167);
//   var mapSetup = {
//     center: latlng,
//     zoom: 10
//   };
//   map = new google.maps.Map(document.getElementById('google-map'), mapSetup);
// }
//
// function codeAddress(address) {
//   geocoder.geocode( {'address': address}, function(results, status) {
//     if(status === google.maps.GeocoderStatus.OK) {
//       map.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: map,
//         position: results[0].geometry.location
//       });
//     } else {
//       console.log('status');
//     }
//   }
// )
// };
