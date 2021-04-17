const express = require('express');
const router = express.Router();
const models = require('../../models');

module.exports = () => {
    // get all the songs of a playlist
    router.get('/', async (req, res) => {
        models.MapPlaylistSongs.findAll().then((map) => {
            res.status(200).send(map);
        }).catch((error) => {
            console.log(error);
            res.status(500).send("There was a problem loading all map.");
        });
    });
    // get a song from a playlist
    router.get('/:id', async (req, res) => {
        if(validator.isInt(req.params.id)){
            models.MapPlaylistSongs.findByPk(req.params.id).then((map) => {
                res.status(200).send(map);
            }).catch((error) => {
                res.status(500).send("There was a problem loading the map.");;
            });
        }else{
            res.status(400).send("Bad parameter for Map ID, must be an integer");
        }  
    });
    // create a playlist with songs
    router.post('/', (req, res) => {
        models.MapPlaylistSongs.create(req.body);
        res.status(200).send("The map has been created");
    });

    return router;
};