const express = require('express');
const router = express.Router();
const models = require('../../models');

const validator = require('validator');

module.exports = () => {
    // return all the users
    router.get('/', async (req, res) => {
        models.Users.findAll({attributes:['id','pseudo']}).then((user) => {
            res.status(200).send(user);
        }).catch((error) => {
            res.status(500).send("There was a problem finding the users.");
        });
    });

    // get a single user
    router.get('/:id', async (req, res) => {
        models.Users.findByPk(req.params.id,{attributes:['id','pseudo']}).then((user) => {
            res.status(200).send(user);
        }).catch((error) => {
            res.status(500).send("There was a problem finding the user.");
        });
    });

    // delete a user
    router.delete('/:id', async (req, res) => {
        if(validator.isInt(req.params.id)){

            models.Users.destroy({
                where: {
                    id: req.params.id
                }
            }).then((album)=> {
                res.status(200).send("The user has been deleted.");
            }).catch((error) => {
                res.status(500).send("There was a problem deleting the user. \n Error : "+error);
            });
        } else {
            res.status(400).send("Bad parameter for deleting User, ID, must be an integer");
        }  
    });

    // update user
    router.put('/:id',(req, res) => {
        if(validator.isInt(req.params.id)){
            models.Users.update(req.body, {
                where: {
                    id: req.params.id
                }
            }).then((artist)=> {
                res.status(200).send("The user has been updated.");
            }).catch((error) => {
                // DEBUG
                //console.log(error);
                res.status(500).send("There was a problem updating the user. \n");
            });
        } else {
            res.status(400).send("Bad parameter for updating user, ID, must be an integer");
        }  
    });
    
    return router;
};
