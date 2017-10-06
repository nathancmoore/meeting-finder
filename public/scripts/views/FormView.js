'use strict';

var app = app || {};

(function (module) {

  const formData  = {};

  formData.Submission = {};

  formData.formListener = function() {
    $('#form').on('submit', function(event) {
      event.preventDefault();
      formData.Submission.timeString = $('#input-time').val();
      formData.Submission.radiusString = $('#input-radius').val();
      app.mapThings.initMap();
      app.meetings.dateFiltered();
      app.mapThings.makeMarkers();
      $('#meetings-area').show();
      $('#legend').show();
      app.tableView.populateTable();
    });
  };

  module.formData = formData;
})(app);
