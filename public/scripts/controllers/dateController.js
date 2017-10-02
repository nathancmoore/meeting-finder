'use strict';

var app = app || {};

(function(module) {

  function Meet (rawSQLResults) {
    Object.assign(this, rawSQLResults);
    this.militaryTime = toMilitaryTime(rawSQLResults.Time);
    this.nextMeeting = new Date();
    this.nextMeeting.setDate(todaysDate.getDate() + weekdayDifference(rawSQLResults.Weekday));
    this.nextMeeting.setHours(this.militaryTime.split(':')[0], this.militaryTime.split(':')[1], 0, 0);
  }

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

  function weekdayDifference(weekday) {
    var dayIndex = todaysDate.getDay();
    var meetIndex = daysOfWeek.indexOf(weekday);
    var difference = meetIndex - dayIndex;
    return difference >= 0 ? difference : difference + 7;
  }

  // 	＼(〇_ｏ)／

  function toMilitaryTime(time) {
    var transformedTime;
    if (time.substring(0, 2) === '12') {
      if (time.includes('AM')) {
        transformedTime = '0' + time.substring(2, 5);
      } else {
        transformedTime = time.split(' ')[0];
      }
    } else if (time.includes('PM')) {
      transformedTime = time.replace(/^\d{1,2}/, parseInt(time.match(/^\d{1,2}/)) + 12).split(' ')[0];
    } else {
      transformedTime = time.split(' ')[0];
    }
    return transformedTime;
  }

  meetings.dateFiltered = meetings.all.filter(function(meet) {
    if (meet.Weekday.includes(todaysWeekday) && todaysDate < meet.nextMeeting && meet.nextMeeting < endOfToday) {
      meetings.timeTarget.push(meet);
    }
  })

  module.meetings = meetings;
})(app);
