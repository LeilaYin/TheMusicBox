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
                res.send(playlist);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
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
                    res.send(playlist);
                }).catch((error) => {
                    res.sendStatus(500);
                });
        } else {
            res.status(400).send("Bad parameter for Playlist ID, must be an integer");
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
                    res.send({ ...playlist.get({ plain: true }), songs: songs });
                }).catch((error) => {
                    console.log(error);
                    res.sendStatus(500);
                });
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
        } else {
            res.status(400).send("Bad parameter for Playlist ID, must be an integer");
        }
    });
    // create a playlist 
    router.post('/', (req, res) => {
        models.Playlists.create(req.body).then(function () {
            res.status(200).send("The playlist creation was successfull");
        }).catch(function (err) {
            res.status(400).send(err);
        });
    });

    // delete a playlist
    router.delete('/:id', async (req, res) => {
        if (validator.isInt(req.params.id)) {
            models.Playlists.destroy({
                where: {
                    id: req.params.id
                }
            }).then((album)=> {
                res.status(200).send("The playlist " + req.params.id + " was deleted");
            }).catch((error) => {
    
                res.status(500).send("There was a problem deleting the artist. \n Error : "+error);
            });
        }else{
            res.status(400).send("Bad parameter for deleting artist, ID, must be an integer");
        }  
    });

    return router;
};
