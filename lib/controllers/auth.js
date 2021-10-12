const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
    .get('/login', (req, res) => {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&scopes=read:user`)
    })

    .get('/login/callback', async (req, res, next) => {
        try {
            const user = await UserService.create(req.query.code);

            res.cookie('session', user.authToken(), {
                httpOnly: true,
                maxAge: ONE_DAY_IN_MS, 
                secure: true
            })

            res.send(user);
            
        } catch (error) {
            next (error);    
        }
    })

    .get('/verify', (req, res, next) => {
        try {
            
        } catch (error) {
            next (error);  
        }
    })