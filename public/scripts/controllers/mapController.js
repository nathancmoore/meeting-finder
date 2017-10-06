'use strict';

var app = app || {};

(function(module) {
  const mapController = {};
  mapController.index = () => {
    $('body > :not(#about-us)').show();
  };

  module.mapController = mapController;
})(app);
