require("dotenv").config()
const express = require("express");
const { client } = require("./db/client");
const path = require('path');
const app = express()

// Setup your Middleware and API Router here
client.connect();

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.use('/dist', express.static(path.join(__dirname, 'dist')));

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const apiRouter = require('./api');
app.use('/api', apiRouter);

module.exports = app;
