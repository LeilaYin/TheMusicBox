const express = require('express');
const router = express.Router();
const models = require('../../models');
const validator = require('validator');


module.exports = () => {
    // get all playlists
    router.get('/', async (req, res) => {
        models.Playlists.findAll({
            include: [{
                model: models.Users,
                as: 'createdBy',
                attributes: ['id', 'pseudo']
            }],
            attributes: ['id', 'PlaylistName']
        })
            .then((playlist) => {
                res.status(200).send(playlist);
            }).catch((error) => {
                //DEBUG
                //console.log(error);
                res.status(500).send("There was a problem loading all playlists.");
            });
    });
    // get a playlist
    router.get('/:id', async (req, res) => {
        if (validator.isInt(req.params.id)) {
            models.Playlists.findByPk(req.params.id, {
                include: [{
                    model: models.Users,
                    as: 'createdBy',
                    attributes: ['id', 'pseudo']
                }],
                attributes: ['id', 'PlaylistName']
            })
                .then((playlist) => {
                    res.status(200).send(playlist);
                }).catch((error) => {
                    // DEBUG
                    //console.log(error);
                    res.status(500).send("There was a problem loading the playlist.");
                });
        } else {
            res.status(400).send("Bad parameter for Playlist ID, must be an integer.");
        }
    });
    // get all songs of a playlist
    router.get('/:id/songs', async (req, res) => {
        if (validator.isInt(req.params.id)) {
            models.Playlists.findByPk(req.params.id, {
                include: [{
                    model: models.Users,
                    as: 'createdBy',
                    attributes: ['id', 'pseudo']
                }
                ],
                attributes: ['id', 'PlaylistName']
            }
            ).then((playlist) => {
                playlist.getSongs({ attributes: ['id', 'SongName', 'Path'] }).then((songs) => {
                    res.status(200).send({ ...playlist.get({ plain: true }), songs: songs });
                }).catch((error) => {
                    // DEBUG
                    //console.log(error);
                    res.status(500).send("There was a problem loading the songs.");
                });
            }).catch((error) => {
                // DEBUG
                //console.log(error);
                res.status(500).send("There was a problem loading the playlist.");
            });
        } else {
            res.status(400).send("Bad parameter for Playlist ID, must be an integer.");
        }
    });
    // create a playlist 
    router.post('/', (req, res) => {
        models.Playlists.create(req.body).then(function () {
            res.status(200).send("The playlist has been created.");
        }).catch(function (err) {
            // DEBUG
            //console.log(err);
            msg_err = "Error when creating a playlist. \n The body must be in JSON format and have the following form :\n { \n \"PlaylistName\":\"name\", \n \"fk_user\":1 \n}";
            res.status(400).send(msg_err);
        });
    });

    // delete a playlist
    router.delete('/:id', async (req, res) => {
        if(validator.isInt(req.params.id)){

            models.Playlists.destroy({
                where: {
                    id: req.params.id
                }
            }).then((album)=> {

                res.status(200).send("The playlist has been deleted.");
            }).catch((error) => {
                // DEBUG
                //console.log(error);
                res.status(500).send("There was a problem deleting the playlist.");
            });
        }else{
            res.status(400).send("Bad parameter for deleting playlist, ID, must be an integer.");
        }  
    });

    //update playlist
    router.put('/:id',(req, res) => {
        if(validator.isInt(req.params.id)){
            models.Playlists.update(req.body, {
                where: {
                    id: req.params.id
                }
            }).then((playlist)=> {
                res.status(200).send("The playlist has been updated.");
            }).catch((error) => {
                // DEBUG
                //console.log(error);
                res.status(500).send("There was a problem updating the playlist. \n");
            });
        }else{
            res.status(400).send("Bad parameter for deleting playlist, ID, must be an integer");

        }  
    });

    return router;
};
