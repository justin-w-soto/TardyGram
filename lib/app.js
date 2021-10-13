const express = require('express');
const cookieParser = require('cookie-parser');
const post = require('../lib/controllers/post');
const auth = require('../lib/controllers/auth');
const comment = require('../lib/controllers/comment');
const app = express();

//-----------------------------------//
app.use(express.static(`${__dirname}/../public`));
app.use(cookieParser());
app.use(express.json());


//-----------------------------------//
app.use('/api/auth', auth);
app.use('/api/auth/posts', post); 
app.use('/api/auth/comments', comment);














//-----------------------------------//
app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
