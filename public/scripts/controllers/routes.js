'use strict';
var app = app || {};

page('/', app.mapController.index);
page('/contact', app.aboutController.index);

page();
