const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router() 
.post('/', ensureAuth, (req, res, next) => {
    try {
        const post = await PostService.create(req.body);

        res.send(post);

    } catch (error) {
       next(error); 
    }
})