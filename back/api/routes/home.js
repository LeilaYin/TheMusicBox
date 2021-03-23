const express = require('express');
const router = express.Router();
const {access} = require("../controller/user.controller"); 

module.exports = () => {
  router.get('/', [access.allAccess]);
    /* // simple route
     router.get('/', (req, res) => {
        res.json({ message: "Welcome to our music application." });
  });*/
  return router;
}