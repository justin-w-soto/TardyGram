const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', (req, res, next) => {
    try{
      res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&scope=read:user`);
    } catch(e){
      next(e);
    }
  })

  .get('/login/callback', async (req, res, next) => {
    try {
     
      const user = await UserService.creator(req.query.code);
     
      res.cookie('session', user.authToken(), {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS, 
        secure: true
      });

      res.send(user);
            
    } catch (error) {
      next (error);    
    }
  })

  .get('/verify', ensureAuth, (req, res, next) => {
    try {
            res.send(req.user);
            
    } catch (error) {
      next (error);  
    }
  });
