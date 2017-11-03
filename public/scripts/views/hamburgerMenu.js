'use strict';

$('#hamburger-menu').click(function() {
  $('ul').toggleClass('opening');
  $(this).toggleClass('open');
});
