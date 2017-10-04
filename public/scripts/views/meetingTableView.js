'use strict';

var app = app || {};

(function (module) {

  console.log('in IIFE');

  //array of all objects being appended to page (after time/date and location filtering)

  const tableView = {};

  tableView.tempData = app.meetings.all;

  // tableView.tempData.sort(function(meetObj1, meetObj2) {
  //   return meetObj1.Meet.time - meetObj2.Meet.time;
  // })

  tableView.sourceHTML = $('#meeting-template').html();
  tableView.meetTemplate = Handlebars.compile(tableView.sourceHTML);

  tableView.populateTable = function() {
    console.log('in populateTable');
    console.log(tableView.tempData[0])
    tableView.tempData.forEach(function(meet) {
      console.log('in forEach');
      var newRawHTML = tableView.meetTemplate(this);
      $('#meetings-table').append(newRawHTML);
    })
  }
  module.tableView = tableView;
})(app);
