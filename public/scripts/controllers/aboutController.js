'use strict';

var app = app || {};

(function (module) {
  const aboutController = {};

  aboutController.index = () => {
    $('body > :not(#about-us)').hide();
    $('#hide-about').css('visibility','hidden')
  };


  module.aboutController = aboutController;
})(app);