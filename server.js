'use strict';

const EXPRESS = require('express');
const bodyParser = require('body-parser');
const PG = require('pg');
const FS = require('fs');
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
    .then(client.query('SELECT * FROM meetingDatabase;'))
    .then(result => {
      if (!result.rowCount) {
        FS.readFile('./public/data/meetingDatabase.json', (err, fd) =>{
          JSON.parse(fd.toString()).forEach(ele => {
            client.query(`
              INSERT INTO meetingDatabase(District,GSIG_Division,Status,Meeting_Name,Group_Name,Weekday,Time,End_Time,OC,Location_Name,Street,Suite,City,State,Zip,Room,Notes,Duration,Language,Environment,Specialty,Format,Accessibility,Updated)
              VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24) ON CONFLICT DO NOTHING`,
              [ele.District, ele.GISG_Division, ele.Status, ele.Meeting_Name, ele.Group_Name, ele.Weekday, ele.Time, ele.End_Time, ele.OC, ele.Location_Name, ele.Street, ele.Suite, ele.City, ele.State, ele.Zip, ele.Room, ele.Notes, ele.Duration, ele.Language, ele.Environment, ele.Specialty, ele.Format, ele.Accessibility, ele.Updated]
            );}
          );
        });
      }})
    .catch(console.error);
})();
