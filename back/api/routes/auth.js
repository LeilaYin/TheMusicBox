const express = require('express');
const router = express.Router();
const {verifySignUp} = require("../middleware/verifySignUp");
const {authentication} = require("../controller/auth.controller");
const {authJwt} = require("../middleware/authJwt");
const {access} = require("../controller/user.controller");

module.exports = () => {
  // User registration
  router.post('/register',[verifySignUp.checkDuplicateUsername], authentication.signup);
  // User login
  router.post('/login', [authentication.signin]);
  // for loggedin users
  router.get('/up',[authJwt.verifyToken], access.userBoard);
  // user logout
  router.get('/logout', authentication.logout);
  
  return router;
};