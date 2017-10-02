'use strict';

var app = app || {};

(function(module) {

  function Meet (rawSQLResults) {
    Object.assign(this, rawSQLResults);
    this.militaryTime = toMilitaryTime(rawSQLResults.Time);
  }

  //1) .get request to SQL database, retrieve all meeting data
  //2) save meeting data into array
  //3) iterate through array
  //4) if SQLArray[i].isBefore (datetime function) 11:59PM today (comparing to todayDate variable), then use jQuery to add to results and index.html

  var todaysDate = new Date();
  var endOfToday = new Date();
  endOfToday.setHours(24, 0, 0, 0);

  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var todaysWeekday = todaysDate.toString().substring(0, 3);

  const meetings = {};

  meetings.all = [];
  meetings.timeTarget = [];

  meetings.getAllMeetings = function(callback) {
    $.get('/meetings')
      .then(
        results => {
          meetings.all.push(results);
          callback();
        }
      )
  };

  function weekdayDifference(meet) {
    var dayIndex = todaysDate.getDay();
    var meetIndex = daysOfWeek.indexOf(meet.Weekday);
    var difference = meetIndex - dayIndex;
    return difference > 0 ? difference : difference + 7;
  }

  // 	＼(〇_ｏ)／

  function toMilitaryTime(time) {
    var transformedTime;
    if ((time).includes('PM')) {
      transformedTime = time.replace(/^\d{1,2}/, parseInt(time.match(/^\d{1,2}/)) + 12).split(' ')[0];
    } else {
      transformedTime = time.split(' ')[0];
    }
    return transformedTime;
  }

  meetings.dateFiltered = meetings.all.filter(function(meet) {
    if (meet.toString().includes(todaysWeekday) && todaysDate < meet.militaryTime && meet.militaryTime < endOfToday) {
      meetings.timeTarget.push(meet);
    }
  })

  module.meetings = meetings;
})(app);
