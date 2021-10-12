const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');

module.exports = Router()
    .get('/login', (req, res) => {
        res.redirect(`https://github.com/login/oauth/authorize?`)
    })
    .get('/login/callback', async (req, res, next) => {
        try {
            
        } catch (error) {
            
        }
    })