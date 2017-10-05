'use strict';

var app = app || {};

(function (module) {
  const aboutController = {};

  aboutController.index = () => {
    $('body > :not(#about-us)').hide();
    $('.about-div').hide();

    $('#name-jacob').on('click', function() {
      $('')
      $('#person-one').toggle();
    })
    $('#name-chelsea').on('click', function() {
      $('#person-two').toggle();
    })
    $('#name-nathan').on('click', function() {
      $('#person-three').toggle();
    })
    $('#name-matt').on('click', function() {
    
      $('#person-four').toggle();
    })
  };


  module.aboutController = aboutController;
})(app);