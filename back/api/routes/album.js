const express = require('express');
const router = express.Router();
const models = require('../../models');
const validator = require('validator');

module.exports = () => {
    // get all albums
    router.get('/', async (req, res) => {
        models.Albums.findAll({include:[{model:models.Artists,attributes:['id','ArtistName']}],attributes:['id','AlbumName']}).then((album) => {
            res.send(album);
        }).catch((error) => {
            //DEBUG
            //console.log(error);
            res.status(500).send("There was a problem loading all albums.");
        });
    });
    // get an album
    router.get('/:id', async (req, res) => {
        if (validator.isInt(req.params.id)) {
            models.Albums.findByPk(req.params.id, {
                include: [
                    {
                        model: models.Artists,
                        attributes: ['id', 'ArtistName']
                    },
                    {
                        model: models.Songs,
                        attributes: ['id', 'SongName', 'Path']
                    }],
                attributes: ['id', 'AlbumName','AlbumReleaseDate']
            }
            ).then((album) => {
                res.status(200).send(album);
            }).catch((error) => {
                res.status(500).send("There was a problem loading the album.");
            });
        } else {
            res.status(400).send("Bad parameter for Album ID, must be an integer");
        }
    });
    // create an album
    router.post('/', (req, res) => {
        models.Albums.create(req.body).then(function(){
            res.status(200).send("The album has been created.");
        }).catch(function(err){
            msg_err = "Error when creating an album. \n The body must be in JSON format and have the following form :\n { \n \"AlbumName\":\"name\", \n \"fk_artist\":1,\n \"AlbumReleaseDate\": \"yyyy/mm/dd\" \n}";
            res.status(400).send(err);
        });
    });

    // delete an album
    router.delete('/:id', async (req, res) => {
        if(validator.isInt(req.params.id)){

            models.Albums.destroy({
                where: {
                    id: req.params.id
                }
            }).then((album)=> {
                res.status(200).send("The album has been deleted.");
            }).catch((error) => {
                // DEBUG
                //console.log(error);
                res.status(500).send("There was a problem deleting the album. \n");
            });
        }else{
            res.status(400).send("Bad parameter for deleting album, ID, must be an integer");
        }  
    });
    
    //update album
    router.put('/:id',(req, res) => {
        if(validator.isInt(req.params.id)){
            models.Albums.findByPk(req.params.id, {
                include: [
                    {
                        model: models.Artists,
                        attributes: ['id', 'ArtistName']
                    },
                    {
                        model: models.Songs,
                        attributes: ['id', 'SongName', 'Path']
                    }],
                attributes: ['id', 'AlbumName','AlbumReleaseDate']
            }
            ).then((album) => {
                var obj = JSON.parse(JSON.stringify(album));
                models.Albums.update(req.body, {
                    where: {
                        id: obj.id
                    }
                }).then((album)=> {
                    res.status(200).send("The album has been updated.");
                }).catch((error) => {
                    // DEBUG
                    //console.log(error);
                    res.status(500).send("There was a problem updating the album. Bad body. \n");
                });
            }).catch((error) => {
                res.status(500).send("There was a problem updating the album, unknown id.");
            });

            
        }else{
            res.status(400).send("Bad parameter for updating album, ID, must be an integer");
        }  
    });

    //add a song to an album
    router.post('/:id/song', (req, res) => {
        if(validator.isInt(req.params.id)){
        var idArtist = models.Albums.findByPk(req.params.id, {
            include: [
                {
                    model: models.Artists,
                    attributes: ['id', 'ArtistName']
                },
                {
                    model: models.Songs,
                    attributes: ['id', 'SongName', 'Path']
                }],
            attributes: ['id', 'AlbumName','AlbumReleaseDate']
        }).then((album) => {
            //var a = album[0].Artist[0].id;
            var obj = JSON.parse(JSON.stringify(album));
            //console.log(typeof obj.Artist)
            obj = JSON.parse(JSON.stringify(obj.Artist));

            models.Songs.create({
                SongName: req.body.SongName,
                Path: req.body.Path,
                SongReleaseDate: req.body.SongReleaseDate,
                fk_album: req.params.id,
                fk_artist: obj.id
            }).then((album) => {
                res.status(200).send("The song has been created.");
            }).catch((error) => {
                // DEBUG
                //console.log(error);
                msg_err = "Error when creating a song. \n The body must be in JSON format and have the following form :\n { \n \"SongName\":\"name\", \n \"fk_user\":1, \n\"Path\":\"/media/song.mp3\",\n\"fk_album\":1,\n\"fk_artist\":1\n}";
                res.status(400).send(msg_err);
            });

        }).catch((error) => {
            res.status(500).send("There was a problem loading the album.");
        });
        }else{
            res.status(400).send("Bad parameter for deleting album, ID, must be an integer");
        } 
    });

    return router;
};