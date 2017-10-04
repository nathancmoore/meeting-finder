'use strict';

var app = app || {};

(function (module) {
  const aboutController = {};

  aboutController.index = () => {
    $('body > :not(#about-us)').hide();
    
  };


  module.aboutController = aboutController;
})(app);