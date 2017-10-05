'use strict';

var app = app || {};

(function (module) {
  const aboutController = {};

  aboutController.index = () => {
    $('body > :not(#about-us)').hide();
    $('#hide-div').css('visibility','hidden !important')
  };


  module.aboutController = aboutController;
})(app);