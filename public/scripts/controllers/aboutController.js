'use strict';

var app = app || {};

(function (module) {
  const aboutController = {};

  aboutController.index = () => {
    $('body > :not(#about-us, ul)').hide();

  };


  module.aboutController = aboutController;
})(app);