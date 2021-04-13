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
            msg_err = "Error when creating a playlist. \n The body must be in JSON format and have the following form :\n { \n \"AlbumName\":\"name\", \n \"fk_artist\":1,\n \"AlbumReleaseDate\": \"yyyy/mm/dd\" \n}";
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

    return router;
};