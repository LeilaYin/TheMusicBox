const express = require('express');
const router = express.Router();
const models = require('../../models');
const validator = require('validator');

module.exports = () => {

    router.get('/', async (req, res) => {
        models.Albums.findAll({include:[{model:models.Artists,attributes:['id','ArtistName']}],attributes:['id','AlbumName']}).then((album) => {
            res.send(album);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    });

    router.get('/:id', async (req, res) => {
        if(validator.isInt(req.params.id)){
            models.Albums.findByPk(req.params.id,{
                                                    include:[
                                                        {
                                                            model:models.Artists,
                                                            attributes:['id','ArtistName']
                                                        },
                                                        {
                                                            model:models.Songs,
                                                            attributes:['id','SongName','Path']
                                                        }],
                                                        attributes: ['id', 'AlbumName']}
                                    ).then((album) => {
                                        res.send(album);
            }).catch((error) => {
                res.sendStatus(500);
            });
        }else{
            res.status(400).send("Bad parameter for Album ID, must be an integer");
        }
    });

    router.post('/', (req, res) => {
        models.Albums.create(req.body).then(function(){
            res.status(200).send();
        }).catch(function(err){
            res.status(400).send(err);
        });
    });

    //delete an album
    router.delete('/:id', async (req, res) => {
        if(validator.isInt(req.params.id)){

            models.Albums.destroy({
                where: {
                    id: req.params.id
                }
            }).then((album)=> {
                res.status(200).send(true);
            }).catch((error) => {

                res.status(500).send("There was a problem deleting the album. \n Error : "+error);
            });
        }else{
            res.status(400).send("Bad parameter for deleting album, ID, must be an integer");
        }  
    });

    return router;
};