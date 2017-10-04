'use strict';

var app = app || {};

(function (module) {

  const formData  = {};

  formData.Submission = {};

  formData.formListener = function() {
    $('#form').on('submit', function(event) {
      event.preventDefault();

      formData.Submission.calendarString = $('#input-date').val();
      formData.Submission.timeString = $('#input-time').val();
      formData.Submission.radiusString = $('#input-radius').val();
      app.meetings.makeFormDate();

      console.log(formData.Submission);

<<<<<<< HEAD
    })
  }

  module.formData = formData;
=======
  module.FormView = FormView;
>>>>>>> f0a7753af2e8209561cdce61031274b414280d26
})(app);
