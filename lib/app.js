const express = require('express');
const cookieParser = require('cookie-parser');
const post = require('../lib/controllers/post');
const app = express();

app.use(express.static(`${__dirname}/../public`));
app.use(cookieParser());
app.use('/api/auth', require('./controllers/auth'));
app.use('/api/auth/posts', post); 
app.use(express.json());

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
