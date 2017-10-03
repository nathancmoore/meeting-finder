'use strict';

var app = app || {};

(function (module) {

// FIXME: make sure that the parameter/argument being passed through here is the one that matches the data object being returned by server. 
  // function FormData(rawDataObj) {
  //   Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  // }

  FormData.all = [];
  var calendarString 
  
  let $searchForm = $('#input-location');
  $searchForm.on('keypress', function(event){
    event.preventDefault();
    let searchString = $searchForm.val().trim();

    let filteredOut = $('#input-location').toArray().filter(function(row){
      return !row.id.includes(searchString);
    });
    $(filteredIn).show();
    $(filteredIn).each((idx, item) => {
      $(item).next().show()
    });
    $(filteredOut).hide();
    $(filteredOut).each((idx, item) => {
      $(item).next().hide()
    });
  })
  //TODO: create form on table with criteria to search with
  let $calendarData = $('#input-date');
  $calendarData.on('click', function() {
    // event.preventDefault();
    calendarString = $calendarData.val();
    console.log(calendarString);
  }); 

  //TODO:  filter out the meetings that are not submitted into the form as the "meet this criteria fields" 

  //TODO: Take the filtered list of meetings and route the data to the map population route/controller. 

  //TODO: Take the filtered list and route the data to the static list route/controller. 

  module.FormData = FormData;
})(app);