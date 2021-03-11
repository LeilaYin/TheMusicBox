const express = require('express');
const router = express.Router();
const models = require('../../models');

module.exports = () => {

    router.get('/', async (req, res) => {
        //res.send('Get all my books');
       // user = await models.Users.findAll();
        models.Songs.findAll({include:[{model:models.Artists},{model:models.Albums}],}).then((song) => {
            res.send(song);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    });

    router.get('/:id', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
        models.Songs.findByPk(req.params.id).then((song) => {
            res.send(song);
        }).catch((error) => {
            res.sendStatus(500);
        });
    });

    router.post('/', (req, res) => {
        models.Songs.create(req.body);
        res.status(200).send();
    });

    return router;
};