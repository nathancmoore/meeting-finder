'use strict';

var app = app || {};

(function(module) {
  const mapController = {};
  mapController.index = () => {
    $('body > :not(#contact)').show();
  };

  module.mapController = mapController;
})(app);
