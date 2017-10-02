'use strict';

const EXPRESS = require('express');
const bodyParser = require('body-parser');
const PG = require('pg');
const PORT = process.env.PORT || 3001;
const app = EXPRESS();

const conString = process.env.DATABASE_URL || 'postgres://postgres:postgresPASSWORD123@localhost:5432/meetingfinder';
const client = new PG.Client(conString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(EXPRESS.static('./public'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));

client.connect();
client.on('error', err => console.error(err));

app.get('*', (request, response) => {
  response.sendFile('index.html', {root: './public'});
});

//other requests go here.

(function loadDatabase() {
  client.query(
    `CREATE TABLE IF NOT EXISTS meetingDatabase(
       District      INTEGER  NOT NULL
      ,GSIG_Division VARCHAR(12) NOT NULL
      ,Status        VARCHAR(1) NOT NULL
      ,Meeting_Name  VARCHAR(40)
      ,Group_Name    VARCHAR(41) NOT NULL
      ,Weekday       VARCHAR(9) NOT NULL
      ,Time          VARCHAR(8) NOT NULL
      ,End_Time      VARCHAR(8) NOT NULL
      ,OC            VARCHAR(1) NOT NULL
      ,Location_Name VARCHAR(36)
      ,Street        VARCHAR(38) NOT NULL
      ,Suite         VARCHAR(14)
      ,City          VARCHAR(17) NOT NULL
      ,State         VARCHAR(2) NOT NULL
      ,Zip           VARCHAR(10) NOT NULL
      ,Room          VARCHAR(25)
      ,Notes         VARCHAR(50)
      ,Duration      INTEGER  NOT NULL
      ,Language      VARCHAR(3)
      ,Environment   VARCHAR(5)
      ,Specialty     VARCHAR(5)
      ,Format        VARCHAR(2)
      ,Accessibility VARCHAR(8)
      ,Updated       VARCHAR(20) NOT NULL
    );`
  )
    .catch(console.error);
})();
