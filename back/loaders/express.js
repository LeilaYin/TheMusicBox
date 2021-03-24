const routes = require('../api');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
    // parse requests of content-type - application/json
    app.use(bodyParser.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    /**
     * Health Check endpoints
     */
    app.get('/status', (req, res) => {
      res.status(200).end();
    });
  
    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());
    // Load API routes
    app.use('/api', routes());
};