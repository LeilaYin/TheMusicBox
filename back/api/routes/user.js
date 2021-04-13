const express = require('express');
const router = express.Router();
const models = require('../../models');

module.exports = () => {
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
    
    return router;
};
