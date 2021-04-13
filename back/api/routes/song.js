const express = require('express');
const router = express.Router();
const models = require('../../models');
const validator = require('validator');

module.exports = () => {
    // get all songs
    router.get('/', async (req, res) => {
        models.Songs.findAll({ include: [{ model: models.Artists }, { model: models.Albums }], }).then((song) => {
            res.status(200).send(song);
        }).catch((error) => {
            //DEBUG
            //console.log(error);
            res.status(500).send("There was a problem loading all songs.");
        });
    });
    // get a song
    router.get('/:id', async (req, res) => {
        if (validator.isInt(req.params.id)) {
            models.Songs.findByPk(req.params.id).then((song) => {
                res.status(200).send(song);
            }).catch((error) => {
                // DEBUG
                //console.log(error);
                res.status(500).send("There was a problem loading the song.");
            });
        } else {
            res.status(400).send("Bad parameter for Song ID, must be an integer");
        }
    });
    // create a song 
    router.post('/', (req, res) => {
        models.Songs.create(req.body).then(function () {
            res.status(200).send("The song has been created.");
        }).catch(function (err) {
            // DEBUG
            //console.log(err);
            msg_err = "Error when creating a song. \n The body must be in JSON format and have the following form :\n { \n \"SongName\":\"name\", \n \"fk_user\":1, \n\"Path\":\"/media/song.mp3\",\n\"fk_album\":1,\n\"fk_artist\":1\n}";
            res.status(400).send(msg_err);
        });

    });

    //delete a song
    router.delete('/:id', async (req, res) => {
        if(validator.isInt(req.params.id)){

            models.Songs.destroy({
                where: {
                    id: req.params.id
                }
            }).then((album)=> {
                res.status(200).send("The song has been deleted.");
            }).catch((error) => {
                // DEBUG
                //console.log(error);
                res.status(500).send("There was a problem deleting the songs. \n");
            });
        } else {
            res.status(400).send("Bad parameter for deleting Song, ID, must be an integer.");
        }
    });

    return router;
};