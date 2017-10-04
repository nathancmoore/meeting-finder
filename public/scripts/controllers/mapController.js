'use strict';

var app = app || {};

(function(module) {
  const mapController = {};
  mapController.index = () => {
    $('#map-area').show();
    $('#about-us').hide();
  };


  module.mapController = mapController;
})(app);
