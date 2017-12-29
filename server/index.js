const express = require('express');
const path = require('path');
const sequelize = require('../database/index.js');
const bodyParser = require('body-parser');
const router = require('./router.js');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist/'));

app.use(router);

const port = 3000;
app.listen(port, () => console.log(`listening to port ${port}`));