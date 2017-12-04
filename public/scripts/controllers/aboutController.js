'use strict';

var app = app || {};

(function (module) {
  const aboutController = {};

  aboutController.index = () => {
    $('body > :not(#contact)').hide();
    $('#contact').show();
  };

  module.aboutController = aboutController;
})(app);
