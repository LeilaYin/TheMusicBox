const express = require('express');
const router = express.Router();
const models = require('../../models');
const validator = require('validator');

module.exports = () => {

    router.get('/', async (req, res) => {
        //res.send('Get all my books');
       // user = await models.Users.findAll();
        models.Artists.findAll().then((artist) => {
            res.send(artist);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    });

    router.get('/:id', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
        if(validator.isInt(req.params.id)){
            models.Artists.findByPk(req.params.id).then((artist) => {
                res.send(artist);
            }).catch((error) => {
                res.sendStatus(500);
            });
        }else{
            res.status(400).send("Bad parameter for Artist ID, must be an integer");
        }
    });

    router.get('/:idArtist/lastAlbum', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
        if(validator.isInt(req.params.idArtist)){
            models.Artists.findAll({
                limit: 3,
                where:{id:req.params.idArtist},
                include:[{model:models.Albums}],
                
            }).then((artist) => {
                res.send(artist);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
        }else{
            res.status(400).send("Bad parameter for Artist ID, must be an integer");
        }
    })

    router.get('/:idArtist/albums', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
        if(validator.isInt(req.params.idArtist)){
            models.Artists.findAll({
                where:{id:req.params.idArtist},
                include:[{model:models.Albums}],
                
            }).then((artist) => {
                res.send(artist);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
        }else{
            res.status(400).send("Bad parameter for Artist ID, must be an integer");
        }
    })

    router.get('/:idArtist/album/:idAlbum', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
        if(validator.isInt(req.params.idArtist) && validator.isInt(req.params.idAlbum)){
            models.Artists.findAll({
                where:{id:req.params.idArtist},
                include:[{model:models.Albums,
            where: {fk_artist:req.params.idArtist,
            id:req.params.idAlbum
            },include:[{model:models.Songs}]
        }]
            }).then((artist) => {
                res.send(artist);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
        }else{
            res.status(400).send("Bad parameter for Artist ID / Album ID, must be an integer");
        }    
    })

    router.get('/:idArtist/songs', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
        if(validator.isInt(req.params.idArtist)){
            models.Artists.findAll({
                limit: 10,
                where:{id:req.params.idArtist},
                include:[{model:models.Songs,include:[{model:models.Albums}]}],
                
            }).then((artist) => {
                res.send(artist);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
        }else{
            res.status(400).send("Bad parameter for Artist ID, must be an integer");
        }  
    })

    router.post('/', (req, res) => {
        models.Artists.create(req.body).then(function(){
            res.status(200).send();
        }).catch(function(err){
            res.status(400).send(err);
        });
    });

    return router;
};