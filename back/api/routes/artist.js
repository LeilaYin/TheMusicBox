const express = require('express');
const router = express.Router();
const models = require('../../models');
const validator = require('validator');

module.exports = () => {
    // get all artists
    router.get('/', async (req, res) => {
        models.Artists.findAll({attributes:['id','ArtistName']}).then((artist) => {
            res.status(200).send(artist);
        }).catch((error) => {
            //DEBUG
            //console.log(error);
            res.status(500).send("There was a problem loading all artists.");
        });
    });
    // get an artist
    router.get('/:id', async (req, res) => {
        if(validator.isInt(req.params.id)){
            models.Artists.findByPk(req.params.id,{attributes:['id','ArtistName']}).then((artist) => {
                res.status(200).send(artist);
            }).catch((error) => {
                res.status(500).send("There was a problem loading the artist.");
            });
        }else{
            res.status(400).send("Bad parameter for Artist ID, must be an integer");
        }
    });
    // get the last album of an artist
    router.get('/:idArtist/lastAlbum', async (req, res) => {
        if(validator.isInt(req.params.idArtist)){
            models.Artists.findAll({
                limit: 3,
                where:{id:req.params.idArtist},
                include:[{model:models.Albums,attributes:['id','AlbumName','AlbumReleaseDate']}],
                order:[[{model:models.Albums},'AlbumReleaseDate','DESC']]    
            }).then((artist) => {
                res.status(200).send(artist);
            }).catch((error) => {
                //DEBUG
                //console.log(error);
                res.status(500).send("There was a problem loading the last album of the artist.");
            });
        }else{
            res.status(400).send("Bad parameter for Artist ID, must be an integer");
        }
    })
    // get all the albums of an artist
    router.get('/:idArtist/albums', async (req, res) => {
        if(validator.isInt(req.params.idArtist)){
            models.Artists.findAll({
                where:{id:req.params.idArtist},
                include:[{model:models.Albums}],
                
            }).then((artist) => {
                res.status(200).send(artist);
            }).catch((error) => {
                //DEBUG
                //console.log(error);
                res.status(500).send("There was a problem loading the albums of the artist.");
            });
        }else{
            res.status(400).send("Bad parameter for Artist ID, must be an integer");
        }
    })
    // get an album of an artist
    router.get('/:idArtist/album/:idAlbum', async (req, res) => {
        if(validator.isInt(req.params.idArtist) && validator.isInt(req.params.idAlbum)){
            models.Artists.findAll({
                where:{id:req.params.idArtist},
                include:[{model:models.Albums,
            where: {fk_artist:req.params.idArtist,
            id:req.params.idAlbum
            },include:[{model:models.Songs}]
        }]
            }).then((artist) => {
                res.status(200).send(artist);
            }).catch((error) => {
                //DEBUG
                //console.log(error);
                res.status(500).send("There was a problem loading the album of the artist.");
            });
        }else{
            res.status(400).send("Bad parameter for Artist ID / Album ID, must be an integer.");
        }    
    })
    // get the songs of an artist
    router.get('/:idArtist/songs', async (req, res) => {
        if(validator.isInt(req.params.idArtist)){
            models.Artists.findAll({
                limit: 10,
                where:{id:req.params.idArtist},
                include:[{model:models.Songs,include:[{model:models.Albums}]}],
                
            }).then((artist) => {
                res.status(200).send(artist);
            }).catch((error) => {
                //DEBUG
                //console.log(error);
                res.status(500).send("There was a problem loading the songs of the artist.");
            });
        }else{
            res.status(400).send("Bad parameter for Artist ID, must be an integer");
        }  
    })
    // create an artist
    router.post('/', (req, res) => {
        models.Artists.create(req.body).then(function(){
            res.status(200).send("The artist has been created.");
        }).catch(function(err){
            //DEBUG
            //console.log(err);
            msg_err = "Error when creating an artist. \n The body must be in JSON format and have the following form :\n { \n \"ArtistName\":\"name\"\n}";
            res.status(400).send(msg_err);
        });
    });

    // delete an artist
    router.delete('/:id', async (req, res) => {
        if(validator.isInt(req.params.id)){

            models.Artists.destroy({
                where: {
                    id: req.params.id
                }
            }).then((album)=> {
                res.status(200).send("The artist has been deleted.");
            }).catch((error) => {
                //DEBUG
                //console.log(error);
                res.status(500).send("There was a problem deleting the artist. \n ");
            });
        }else{
            res.status(400).send("Bad parameter for deleting artist, ID, must be an integer");
        }  
    });

    //add an album to an artist
    router.post('/:id/album', (req, res) => {
        if(validator.isInt(req.params.id)){
            models.Artists.findByPk(req.params.id,{attributes:['id','ArtistName']}).then((artist) => {
                var obj = JSON.parse(JSON.stringify(artist));
                models.Albums.create({
                    AlbumName: req.body.AlbumName,
                    fk_artist: obj.id,
                    AlbumReleaseDate: req.body.AlbumReleaseDate 
                }).then((album) => {
                    res.status(200).send("The album has been created.");
                }).catch(function(err){
                    msg_err = "Error when creating an album. \n The body must be in JSON format and have the following form :\n { \n \"AlbumName\":\"name\", \n \"fk_artist\":1,\n \"AlbumReleaseDate\": \"yyyy/mm/dd\" \n}";
                    res.status(400).send(err);
                });

            }).catch((error) => {
                res.status(500).send("There was a problem loading the artist.");
            });
            
        }else{
            res.status(400).send("Bad parameter for deleting album, ID, must be an integer");
        } 
    });

    //update artist
    router.put('/:id',(req, res) => {
        if(validator.isInt(req.params.id)){
            models.Artists.findByPk(req.params.id,{attributes:['id','ArtistName']}).then((artist) => {
                var obj = JSON.parse(JSON.stringify(artist));
                models.Artists.update(req.body, {
                    where: {
                        id: obj.id
                    }
                }).then((artist)=> {
                    res.status(200).send("The artist has been updated.");
                }).catch((error) => {
                    // DEBUG
                    //console.log(error);
                    res.status(500).send("There was a problem updating the artist. \n");
                });

            }).catch((error) => {
                res.status(500).send("There was a problem updating the artist, unknown id.");
            });
        }else{
            res.status(400).send("Bad parameter for updating artist, ID, must be an integer");
        }  
    });

    return router;
};