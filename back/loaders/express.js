const routes = require('../api');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

module.exports = (app) => {

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
  
    app.get('/status', (req, res) => {
      res.status(200).end();
    });
  
    app.use(bodyParser.json());
    app.use('/api', routes());
};