const express = require('express');
const router = express.Router();
const models = require('../../models');

module.exports = () => {

    router.get('/', async (req, res) => {
        //res.send('Get all my books');
       // user = await models.Users.findAll();
        models.Playlists.findAll().then((playlist) => {
            res.send(playlist);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    });

    router.get('/:id', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
        if(validator.isInt(req.params.id)){
            models.Playlists.findByPk(req.params.id).then((playlist) => {
                res.send(playlist);
            }).catch((error) => {
                res.sendStatus(500);
            });
        }else{
            res.status(400).send("Bad parameter for Playlist ID, must be an integer");
        }
    });

    router.get('/:id/songs', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
        if(validator.isInt(req.params.id)){
            models.Playlists.findByPk(req.params.id).then((playlist) => {
                playlist.getSongs().then((songs)=>{
                    res.send(songs);
                }).catch((error) => {
                    console.log(error);
                    res.sendStatus(500);
                });
            }).catch((error) => {
                res.sendStatus(500);
            });
        }else{
            res.status(400).send("Bad parameter for Playlist ID, must be an integer");
        }
    });

    router.post('/', (req, res) => {
        models.Playlists.create(req.body);
        res.status(200).send();
    });

    return router;
};