const express = require('express');
const router = express.Router();
const models = require('../../models');
const validator = require('validator');

module.exports = () => {
    // get all songs
    router.get('/', async (req, res) => {
        models.Songs.findAll({ include: [{ model: models.Artists }, { model: models.Albums }], }).then((song) => {
            res.send(song);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    });
    // get a song
    router.get('/:id', async (req, res) => {
        if (validator.isInt(req.params.id)) {
            models.Songs.findByPk(req.params.id).then((song) => {
                res.send(song);
            }).catch((error) => {
                res.sendStatus(500);
            });
        } else {
            res.status(400).send("Bad parameter for Song ID, must be an integer");
        }
    });
    // create a song 
    router.post('/', (req, res) => {
        models.Songs.create(req.body).then(function () {
            res.status(200).send();
        }).catch(function (err) {
            res.status(400).send(err);
        });

    });

    //delete a song
    router.delete('/:id', async (req, res) => {
        if (validator.isInt(req.params.id)) {
            models.Songs.findByPk(req.params.id).then((song) => {
                res.delete(song);
                res.sendStatus(200);
            }).catch((error) => {
                res.status(500).send("There was a problem deleting the songs.");
            });
        } else {
            res.status(400).send("Bad parameter for deleting Song, ID, must be an integer");
        }
    });

    return router;
};