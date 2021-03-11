const express = require('express');
const router = express.Router();
const models = require('../../models');

module.exports = () => {

    router.get('/', async (req, res) => {
        models.Users.findAll().then((user) => {
            res.send(user);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    });

    router.get('/:id', async (req, res) => {
        models.Users.findByPk(req.params.id).then((user) => {
            res.send(user);
        }).catch((error) => {
            res.sendStatus(500);
        });
    });

    router.post('/', (req, res) => {
        models.Users.create(req.body).then(function(){
            res.status(200).send();
        }).catch(function(err){
            res.status(400).send(err);
        });
    });

    return router;
};