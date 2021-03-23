const models = require('../../models');

//checking the validity of the user
checkDuplicateUsername = (req, res, next) => {
    // Username
    models.Users.findOne({
      where: {
        pseudo: req.body.pseudo
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Username is already in use!"
        });
        return;
      }
      next();
    });
};

const verifySignUp = { checkDuplicateUsername: checkDuplicateUsername };

module.exports = {verifySignUp};