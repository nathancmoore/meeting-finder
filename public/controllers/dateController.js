'use strict';

var app = app || {};

(function(module) {

  function Meet (rawSQLResults) {
    Object.assign(this, rawSQLResults);
    this.militaryTime = toMilitaryTime(rawSQLResults.time);
  };

  //1) .get request to SQL database, retrieve all meeting data
  //2) save meeting data into array
  //3) iterate through array
  //4) if SQLArray[i].isBefore (datetime function) 11:59PM today (comparing to todayDate variable), then use jQuery to add to results and index.html

  var todaysDate = new Date();
  var endOfToday = new Date();
  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  endOfToday.setHours(24, 0, 0, 0);

  var todaysWeekday = todaysDate.toString().substring(0, 3);

  const meetings = {};

  meetings.all = [];
  meetings.timeTarget = [];

  meetings.getAllMeetings = function(callback) {

    // ajax call (get request). render all articles. Move to Models? Push into meetings.all

//     Article.fetchAll = callback => {
//   $.get('/meetings')
//   .then(
//     results => {
//       Article.loadAll(results);
//       callback();
//     }
//   )
// };

function weekdayDifference(meet) {
  var dayIndex = todaysDate.getDay();
  var meetIndex = daysOfWeek.indexOf(meet.weekday);
  var difference = meetIndex - dayIndex;
  return difference > 0 ? difference : difference + 7;
}

// 	＼(〇_ｏ)／

function toMilitaryTime(time) {
  if ((time).includes('PM')) {
    var transformedTime = time.replace(/^\d{1,2}/, parseInt(time.match(/^\d{1,2}/)) + 12).split(' ')[0];
  } else {
    var transformedTime = time.split(' ')[0];
  }
}

  meetings.dateFiltered = meetings.all.filter(function(meet) {
    if (meet.toString().includes(todaysWeekday) && todaysDate < (meeting.time) &&  meeting.time < endOfToday) {
      meeting.timeTarget.push(meet);
    }
  }

  // meetings.with = attr => meetings.all.filter(repo => repo[attr]);
  meet => meet.DATE.isBefore)

  module.meetings = meetings;
})(app);
