'use strict';

const EXPRESS = require('express');
const bodyParser = require('body-parser');
const PG = require('pg');
const PORT = process.env.PORT || 3000;
const app = EXPRESS();
