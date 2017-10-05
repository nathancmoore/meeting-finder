'use strict';
var app = app || {};


page('/', app.mapController.index);
page('/about', app.aboutController.index);

page();