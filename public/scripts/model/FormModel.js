'use strict';

var app = app || {};

(function (module) {

// FIXME: make sure that the parameter/argument being passed through here is the one that matches the data object being returned by server. 
  function FormData(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  FormData.all = [];
  
  let $searchForm = $('#form');
  $searchForm.on('keyup', function(){
    let searchString = $searchForm.val().trim();
    // take the searchString value and compare it to the name value of each pokemon.
    let filteredIn = $('#form').toArray().filter(function(row){
      return row.id.includes(searchString);
    });
    let filteredOut = $('#form').toArray().filter(function(row){
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
	let $searchForm = $('#form').click(); 

  //TODO:  filter out the meetings that are not submitted into the form as the "meet this criteria fields" 

  //TODO: Take the filtered list of meetings and route the data to the map population route/controller. 

  //TODO: Take the filtered list and route the data to the static list route/controller. 

  module.FormData = FormData;
})(app);