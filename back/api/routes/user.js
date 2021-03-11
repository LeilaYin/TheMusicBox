const express = require('express');
const router = express.Router();
const models = require('../../models');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/config');

module.exports = () => {

    //Create a user
    router.post('/register', function(req, res) {

        console.log('this is pass : ', req.body.pass);
        let hashedPass = bcrypt.hashSync(req.body.pass, 8);
        console.log('this is hash : ', hashedPass);

        models.Users.create({
            pseudo: req.body.pseudo,
            pass: hashedPass // the pass will be encrypted the moment it is sent by the user
        }).then(user => {
            //token creation
            //the jwt.sign here will create a unique key containing the secret key defined in config and the user id
            const token = jwt.sign({ id: user.id }, config.secret, { 
            expiresIn: 86400 // expires in 24 hours
        });
            console.log('this is token : ',  token); 
            res.status(200).send({ auth: true, token: token });
        }).catch((error) => {
            res.sendStatus(500).send("There was a problem registering the user.");
        }); 
    });
      //login
    router.post('/login', function(req, res) { 
        models.Users.findOne({where: {pseudo: req.body.pseudo}}).then((user) => {
            if (!user) return res.status(404).send('No user found.');
            const validPass =  bcrypt.compareSync(req.body.pass, user.pass);
            if(!validPass) return res.status(401).send({ auth: false, token: null});
            
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
            res.status(200).send({ auth: true, token: token });
        }).catch((error) => {
            res.status(500).send('Error on the server.');
        });
    });

    //logout 
    router.get('/logout', async (req, res) => {
        res.status(200).send({auth: false, token: null});
    });


    //return all the users
    router.get('/', async (req, res) => {
        models.Users.findAll({attributes:['id','pseudo']}).then((user) => {
            res.status(200).send(user);
        }).catch((error) => {
            res.status(500).send("There was a problem finding the users.");
        });
    });

    //get a single user

    
    router.get('/:id', async (req, res) => {
        models.Users.findByPk(req.params.id,{attributes:['id','pseudo']}).then((user) => {
            res.status(200).send(user);
        }).catch((error) => {
            res.status(500).send("There was a problem finding the user.");
        });
    });

    //delete a user
    router.delete('/:id', async (req, res) => {
        models.Users.findByPk(req.params.id).then((user) => {
            res.delete(user);
            res.sendStatus(200);
        }).catch((error) => {
            res.status(500).send("There was a problem deleting the user");
        });
    });

    //update a user
    router.put('/:id', async (req, res) => {
        models.Users.findByPk(req.params.id).then((user) => {
            res.status(200).set(req.body);
        }).catch((error) => {
            res.status(500).send("There was a problem updating the user.");
        });
    });

    //[TEST]check the validity of the user
    router.get('/test/me', (req, res) => {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
            //res.status(200).send(decoded);
            models.Users.findByPk(decoded.id,{attributes:['id','pseudo']}).then((user) => {
                if (!user) return res.status(404).send("No user found.");
                const hiddenPass = user.pass; // to save the password somewhere
                //user.pass = null; 
                res.status(200).send(user);
            }).catch((error) => {
                if (error) return res.status(500).send("There was a problem finding the user.");
            });
        });
    });

    return router;
};