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

  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var todaysWeekday = todaysDate.toString().substring(0, 3);

  const meetings = {};

  meetings.all = [];
  meetings.filtered = [];

  // meetings.makeFormDate = function() {
  //   let formYear = parseInt(app.formData.Submission.calendarString.substring(0, 4));
  //   let formMonth = parseInt(app.formData.Submission.calendarString.substring(5, 7));
  //   let formDay = parseInt(app.formData.Submission.calendarString.substring(8));
  //   todaysDate = new Date(formYear, formMonth, formDay);
  //   endOfToday = new Date();
  //   endOfToday.setHours(24, 0, 0, 0);
  //   console.log(todaysDate);
  // };

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
      .then(callback);
  };

  function weekdayDifference(weekday) {
    var dayIndex = todaysDate.getDay();
    var meetIndex = daysOfWeek.indexOf(weekday);
    var difference = meetIndex - dayIndex;
    return difference >= 0 ? difference : difference + 7;
  }

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

  meetings.dateFiltered = () => {
    app.meetings.filtered = [];
    meetings.all.filter(meet => {
      var mtgLocation = new google.maps.LatLng(meet.lat, meet.lng);
      meet.distanceBetween = (0.000621371 * google.maps.geometry.spherical.computeDistanceBetween(app.mapThings.userLocation, mtgLocation));
      if (meet.weekday.includes(todaysWeekday) && todaysDate < meet.nextMeeting && meet.nextMeeting < endOfToday && meet.distanceBetween <= app.formData.Submission.radiusString) {
        meetings.filtered.push(meet);
      }
    });
  };
  module.meetings = meetings;
})(app);
