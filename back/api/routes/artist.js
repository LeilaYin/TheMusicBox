const express = require('express');
const router = express.Router();
const models = require('../../models');

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
        models.Artists.findByPk(req.params.id).then((artist) => {
            res.send(artist);
        }).catch((error) => {
            res.sendStatus(500);
        });
    });

    router.get('/:idArtist/album', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
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
    })

    router.get('/:idArtist/albums', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
        models.Artists.findAll({
            where:{id:req.params.idArtist},
            include:[{model:models.Albums}],
            
        }).then((artist) => {
            res.send(artist);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    })

    router.get('/:idArtist/album/:idAlbum', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
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
    });

    router.get('/:idArtist/songs', async (req, res) => {
        //user = await models.Users.findByPk(req.params.id);
        //res.send(user);
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
    })

    router.post('/', (req, res) => {
        models.Artists.create(req.body);
        res.status(200).send();
    });

    return router;
};