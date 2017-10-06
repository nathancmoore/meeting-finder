'use strict';

var app = app || {};

(function (module) {
  const aboutController = {};

  aboutController.index = () => {
    $('body > :not(#about-us)').hide();
    $('#about-us').show();
    $('.about-div').hide();

    $('#name-jacob').on('click', function() {
      $('.about-div').hide();
      $('#person-one').toggle();
    })
    $('#name-chelsea').on('click', function() {
      $('.about-div').hide();
      $('#person-two').toggle();
    })
    $('#name-nathan').on('click', function() {
      $('.about-div').hide();
      $('#person-three').toggle();
    })
    $('#name-matt').on('click', function() {
      $('.about-div').hide();
      $('#person-four').toggle();
    })
  };


  module.aboutController = aboutController;
})(app);
