const express = require('express');
const router = express.Router();
const models = require('../../models');
const validator = require('validator');

module.exports = () => {

    router.get('/', async (req, res) => {
        models.Songs.findAll({include:[{model:models.Artists},{model:models.Albums}],}).then((song) => {
            res.send(song);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    });

    router.get('/:id', async (req, res) => {
        if(validator.isInt(req.params.id)){
            models.Songs.findByPk(req.params.id).then((song) => {
                res.send(song);
            }).catch((error) => {
                res.sendStatus(500);
            });
        }else{
            res.status(400).send("Bad parameter for Song ID, must be an integer");
        }  
    });

    router.post('/', (req, res) => {
        models.Songs.create(req.body).then(function(){
            res.status(200).send();
        }).catch(function(err){
            res.status(400).send(err);
        });
        
    });

    return router;
};