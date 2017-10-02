'use strict';

var app = app || {};

(function (module) {

// FIXME: make sure that the parameter/argument being passed through here is the one that matches the data object being returned by server. 
  function FormData(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  FormData.all = [];

  //TODO:  filter out the meetings that are not submitted into the form as the "meet this criteria fields" 

  //TODO: Take the filtered list of meetings and route the data to the map population route/controller. 

  //TODO: Take the filtered list and route the data to the static list route/controller. 

  module.FormData = FormData;
})(app);