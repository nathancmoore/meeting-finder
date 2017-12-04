'use strict';

var app = app || {};

(function(module) {
  const mapController = {};
  mapController.index = () => {
    // $('body > :not(#contact)').show();
    // $('body > section').hide();
    $('#contact').hide();
    // $('#map-area').show()
    $('#home-data').show();
    console.log('mapController')
  };

  module.mapController = mapController;
})(app);
