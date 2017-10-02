'use strict';

const EXPRESS = require('express');
const bodyParser = require('body-parser');
const PG = require('pg');
const PORT = process.env.PORT || 3000;
const app = EXPRESS();

const conString = 'public/data/meetingDatabase.json';
const client = new PG.Client(conString);

// client.connect();
// client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(EXPRESS.static('./public'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));

//other requests go here.

app.get('*', (request, response) => {
  response.sendFile('index.html', {root: './public'});
});
