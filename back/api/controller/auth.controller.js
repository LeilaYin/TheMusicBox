const models = require('../../models');
const config = require("../../config/auth.config");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

signup = (req, res) => {
    console.log('this is pass : ', req.body.pass);
    let hashedPass = bcrypt.hashSync(req.body.pass, 8);
    console.log('this is hash : ', hashedPass);

    models.Users.create({
        pseudo: req.body.pseudo,
        pass: hashedPass // the pass will be encrypted the moment it is sent by the user
    }).then(() => {
        console.log("starts !")
        res.status(200).send({ message: "User registered successfully"});
        console.log("finished !")
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

signin = (req, res) => {
    models.Users.findOne({
        where: {pseudo: req.body.pseudo}
    }).then((user) => {
        if (!user) {
            return res.status(404).send('User not found.');
        }
        var passwordIsValid = bcrypt.compareSync( req.body.pass, user.pass );
        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
          res.status(200).send({ id: user.id, pseudo: user.pseudo, accessToken: token });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

logout = (req, res) => {
    res.status(200).send({message: "User successfully logged out "});
};

const authentication = {signup, signin, logout};

module.exports = {authentication};