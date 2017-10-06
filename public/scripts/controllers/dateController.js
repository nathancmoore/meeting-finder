'use strict';

var app = app || {};

(function(module) {

  function Meet (rawSQLResults) {
    Object.assign(this, rawSQLResults);
    this.militaryTime = toMilitaryTime(rawSQLResults.time);
    this.timeBatch = calculateTimeBatch(this.militaryTime);
  }

  var todaysDate = new Date();
  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var todaysWeekday = todaysDate.toString().substring(0, 3);

  const meetings = {};

  meetings.all = [];
  meetings.filtered = [];

  meetings.getAllMeetings = function(callback) {
    $.get('/meetings')
      .then(
        results => {
          results.forEach(obj => {
            var newObj = new Meet(obj);
            meetings.all.push(newObj);
          });
        }
      )
      .then(callback);
  };

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
    var intermediateTime = transformedTime.replace(/:/ig, '');
    if(intermediateTime.length === 3){
      var finalTime = '0' + intermediateTime;
      return finalTime;
    }
    return intermediateTime;
  }

  function calculateTimeBatch(milTime) {
    if (milTime < 1159) {
      return 'Morning';
    } else if (milTime >= 1200 && milTime < 1659) {
      return 'Afternoon';
    } else if (milTime >= 1700 && milTime < 2059) {
      return 'Evening';
    } else {
      return 'Night';
    }
  }

  meetings.dateFiltered = () => {
    app.meetings.filtered = [];
    meetings.all.filter(meet => {
      var mtgLocation = new google.maps.LatLng(meet.lat, meet.lng);
      meet.distanceBetween = (0.000621371 * google.maps.geometry.spherical.computeDistanceBetween(app.mapThings.userLocation, mtgLocation));

      if (meet.weekday.includes(todaysWeekday) && meet.distanceBetween <= app.formData.Submission.radiusString && meet.timeBatch === app.formData.Submission.timeString) {
        meetings.filtered.push(meet);
      }
    });
  };

  module.meetings = meetings;
})(app);
