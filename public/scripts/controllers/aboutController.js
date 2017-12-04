'use strict';

var app = app || {};

(function (module) {
  const aboutController = {};

  aboutController.index = () => {
    $('#home-data').hide();
    $('#contact').show();
    console.log('about page')
  };

  module.aboutController = aboutController;
})(app);
