'use strict';

var app = app || {};

(function (module) {

  //array of all objects being appended to page (after time/date and location filtering)

  const tableView = {};

  tableView.sourceHTML = $('#meeting-template').html();
  tableView.meetTemplate = Handlebars.compile(tableView.sourceHTML);

  tableView.populateTable = function() {
    app.meetings.all.forEach(function(meet) {
      var newRawHTML = tableView.meetTemplate(meet);
      $('#meetings-table').append(newRawHTML);
    })
  }
  module.tableView = tableView;
})(app);
