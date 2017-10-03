'use strict';

var app = app || {};

(function (module) {

  var Submission = {};

  $('#form').on('submit', function(event) {
    event.preventDefault();

    Submission.calendarString = $('#input-date').val();
    Submission.timeString = $('#input-time').val();
    Submission.radiusString = $('#input-radius').val();

    console.log(Submission);

  })

  module.FormData = FormData;
})(app);
