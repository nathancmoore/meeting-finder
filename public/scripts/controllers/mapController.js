'use strict';

var app = app || {};

(function(module) {
  const mapController = {};
  mapController.index = () => {
    $('body > :not(#about-us)').show();
    $('#map-area').show();
    $('#meeting-table').show();

  };


  module.mapController = mapController;
})(app);
