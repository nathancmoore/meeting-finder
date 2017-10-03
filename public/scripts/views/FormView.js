'use strict';

var app = app || {};

(function (module) {

// FIXME: make sure that the parameter/argument being passed through here is the one that matches the data object being returned by server.
  // function FormData(rawDataObj) {
  //   Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  // }

  var Submission = {};

  FormData.all = [];

  $('#form').on('submit', function(event) {
    event.preventDefault();

    Submission.searchString = $('#input-location').val();
    Submission.calendarString = $('#input-date').val();
    Submission.timeString = $('#input-time').val();
    Submission.radiusString = $('#input-radius').val();

    console.log(Submission);

  })

  module.FormData = FormData;
})(app);
