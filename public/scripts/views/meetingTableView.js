'use strict';

var app = app || {};

(function (module) {

  const tableView = {};

  tableView.sourceHTML = $('#meeting-template').html();
  tableView.meetTemplate = Handlebars.compile(tableView.sourceHTML);

  tableView.populateTable = function() {
    app.meetings.filtered.forEach(function(meet) {
      var newRawHTML = tableView.meetTemplate(meet);
      $('#meetings-table').append(newRawHTML);
    });
  };
  module.tableView = tableView;
})(app);
