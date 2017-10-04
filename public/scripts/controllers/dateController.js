'use strict';

var app = app || {};

(function(module) {

  function Meet (rawSQLResults) {
    Object.assign(this, rawSQLResults);
    this.militaryTime = toMilitaryTime(rawSQLResults.time);
    this.nextMeeting = new Date();
    this.nextMeeting.setDate(todaysDate.getDate() + weekdayDifference(rawSQLResults.weekday));
    this.nextMeeting.setHours(this.militaryTime.split(':')[0], this.militaryTime.split(':')[1], 0, 0);
  }

  var todaysDate = new Date();
  var endOfToday = new Date();
  endOfToday.setHours(24, 0, 0, 0);

  //I need to get form data (from calendarString) from FormView.js.
  //calendarString in IIFE, called in index.html
  //console logged, iife info not logging

  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var todaysWeekday = todaysDate.toString().substring(0, 3);

  const meetings = {};

  meetings.all = [];
  meetings.filtered = [];

  meetings.makeFormDate = function() {
    let formYear = parseInt(app.formData.Submission.calendarString.substring(0, 4));
    let formMonth = parseInt(app.formData.Submission.calendarString.substring(5, 7));
    let formDay = parseInt(app.formData.Submission.calendarString.substring(8));
    todaysDate = new Date(formYear, formMonth, formDay);
    endOfToday = new Date();
    endOfToday.setHours(24, 0, 0, 0);
    console.log(todaysDate);
  }

  meetings.getAllMeetings = function(callback) {
    $.get('/meetings')
      .then(
        results => {
          results.forEach(obj => {
            var newGuy = new Meet(obj);
            meetings.all.push(newGuy);
          });
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

  meetings.dateFiltered = () => {meetings.all.filter(meet => {
    if (meet.weekday.includes(todaysWeekday) && todaysDate < meet.nextMeeting && meet.nextMeeting < endOfToday) {
      meetings.filtered.push(meet);
    }
  })
  }

  module.meetings = meetings;
})(app);
