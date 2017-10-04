'use strict';

(function () {

  //array of all objects being appended to page (after time/date and location filtering)

  const tableView = {};

  tableView.tempData = [];

  tableView.sourceHTML = $('#meeting-template').html();
  tableView.meetTemplate = Handlebars.compile(sourceHTML);



  tableView.appendToPage = function() {
    var newRawHTML = projectTemplate(this);
    $('#meetings-table').append(newRawHTML);
  }
