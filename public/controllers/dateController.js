'use strict';

var app = app || {};

(function(module) {

  //1) .get request to SQL database, retrieve all meeting data
  //2) save meeting data into array
  //3) iterate through array
  //4) if SQLArray[i].isBefore (datetime function) 11:59PM today (comparing to todayDate variable), then use jQuery to add to results and index.html

  var todayDate = Date();
  var todaysWeekday = todaysDate.toString()[0] + todaysDate.toString()[1] + todaysDate.toString()[2];
  var endOfToday;

  const meetings = {};

  meetings.all = [];

  meetings.getAllMeetings = function(callback) {

    //CLIENT QUERY below *should* be grabbing all the meeting data from server.js. Is that already done in server.js? -Chelsea
    CLIENT.query(#)
      .then(data => meetings.all = data, err => console.log(err))
      .then(callback)
  };

  meetings.dateFiltered = meetings.all.filter(function(meet) {
    if (meet.toString().includes(todaysWeekday) )
  }


  // meetings.with = attr => meetings.all.filter(repo => repo[attr]);
  meet => meet.DATE.isBefore)

  module.meetings = meetings;
})(app);
