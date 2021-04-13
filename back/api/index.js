const express = require('express');

const user = require('./routes/user');
const artist = require('./routes/artist');
const album = require('./routes/album');
const playlist = require('./routes/playlist');
const song = require('./routes/song');
const map = require('./routes/map');
const auth = require('./routes/auth');
const home = require('./routes/home');

const router = express.Router();

module.exports = () => {

    router.use('/user',user()),
    router.use('/artist',artist()),
    router.use('/album',album()),
    router.use('/playlist',playlist()),
    router.use('/song',song()),
    router.use('/map',map()),
    router.use('/auth',auth()),
    router.use('/Home',home())
    
    return router;
};