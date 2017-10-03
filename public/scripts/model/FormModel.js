'use strict';

var app = app || {};

(function (module) {

// FIXME: make sure that the parameter/argument being passed through here is the one that matches the data object being returned by server.
  // function FormData(rawDataObj) {
  //   Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  // }

  FormData.all = [];
  var calendarString;
  var searchString;
  var radiusString;
  var timeString;

  let $searchForm = $('#input-location');
  $searchForm.on('submit', function(){
    searchString = $searchForm.val();
    console.log(searchString);
  });

  let $calendarData = $('#input-date');
  $calendarData.on('submit', function() {
    calendarString = $calendarData.val();
    console.log(calendarString);
  });

  let $timeData = $('#input-time');
  $timeData.on('submit', function() {
    timeString = $timeData.val();
    console.log(timeString);
  });

  let $radiusData = $('#input-radius');
  $radiusData.on('submit', function() {
    radiusString = $radiusData.val();
    console.log(radiusString);
  });

  module.FormData = FormData;
})(app);
